import Link from 'next/link';
import { requireAdminToken } from '@/lib/auth/session';
import { LogoutButton } from '@/components/admin/LogoutButton';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Utilisateurs' },
  { href: '/admin/descriptors', label: 'Descripteurs' },
];

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  await requireAdminToken();
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r border-encre/10 bg-white px-4 py-6">
        <span className="px-3 font-serif text-2xl italic text-foret-800">Dali</span>
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-dali-md px-3 py-2 text-sm text-encre transition-colors hover:bg-foret-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end border-b border-encre/10 bg-white px-8 py-4">
          <LogoutButton />
        </header>
        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
