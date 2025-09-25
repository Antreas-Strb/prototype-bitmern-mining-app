'use client';

import { useRouter, usePathname } from 'next/navigation';
import App from '../App';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname() || '/';

  return <App router={router} pathname={pathname} />;
}