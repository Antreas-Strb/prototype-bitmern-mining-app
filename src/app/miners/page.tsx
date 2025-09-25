'use client';

import dynamic from 'next/dynamic';

const MinersPage = dynamic(() => import('../../pages/miners/MinersPage'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  )
});

export default MinersPage;