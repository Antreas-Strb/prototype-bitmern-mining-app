import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const VIABTC_API_KEY = Deno.env.get('VIABTC_API_KEY');
const VIABTC_API_SECRET = Deno.env.get('VIABTC_API_SECRET');
const VIABTC_BASE_URL = 'https://api.viabtc.com/v1';

async function fetchViaBTCData(endpoint: string, params: Record<string, string> = {}) {
  if (!VIABTC_API_KEY || !VIABTC_API_SECRET) {
    throw new Error('ViaBTC API credentials not configured. Please set VIABTC_API_KEY and VIABTC_API_SECRET environment variables.');
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const queryString = new URLSearchParams({
    ...params,
    access_key: VIABTC_API_KEY,
    tonce: timestamp,
  }).toString();

  const signature = await createSignature(queryString);
  
  const response = await fetch(`${VIABTC_BASE_URL}${endpoint}?${queryString}`, {
    headers: {
      'Authorization': signature,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`ViaBTC API error: ${errorData.message || response.statusText}`);
  }

  return response.json();
}

async function createSignature(queryString: string): Promise<string> {
  const message = queryString + '&secret_key=' + VIABTC_API_SECRET;
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('MD5', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: {
        ...corsHeaders,
        'Access-Control-Max-Age': '86400',
      }
    });
  }

  try {
    // Validate request
    if (!req.headers.get('Authorization')) {
      throw new Error('Authorization header is required');
    }

    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint');

    if (!endpoint) {
      throw new Error('Endpoint parameter is required');
    }

    // Check for required environment variables early
    if (!VIABTC_API_KEY || !VIABTC_API_SECRET) {
      return new Response(
        JSON.stringify({
          error: 'ViaBTC API credentials not configured. Please configure VIABTC_API_KEY and VIABTC_API_SECRET in the environment variables.'
        }),
        {
          status: 503,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const data = await fetchViaBTCData(endpoint);

    return new Response(
      JSON.stringify(data),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      }
    );
  } catch (error) {
    console.error('Error in ViaBTC function:', error);

    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack
      }),
      {
        status: error.message.includes('not configured') ? 503 : 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});