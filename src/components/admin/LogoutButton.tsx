'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-sm text-sable-700 transition-colors hover:text-encre"
      onClick={async () => {
        await fetch('/admin/api/logout', { method: 'POST' });
        router.replace('/admin/login');
      }}
    >
      Déconnexion
    </button>
  );
}
