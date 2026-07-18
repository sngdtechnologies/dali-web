'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const data = new FormData(event.currentTarget);
    try {
      const res = await fetch('/admin/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), password: data.get('password') }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? 'Identifiants invalides');
        setPending(false);
        return;
      }
      router.replace('/admin');
    } catch {
      setError('Service indisponible, réessayez.');
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input id="email" name="email" label="Email" type="email" autoComplete="username" required disabled={pending} />
      <Input id="password" name="password" label="Mot de passe" type="password" autoComplete="current-password" required disabled={pending} />
      {error ? (
        <p role="alert" className="rounded-dali-md bg-corail/10 px-4 py-2.5 text-sm text-terre">{error}</p>
      ) : null}
      <Button type="submit" disabled={pending} className="mt-2 w-full">
        {pending ? 'Connexion…' : 'Se connecter'}
      </Button>
    </form>
  );
}
