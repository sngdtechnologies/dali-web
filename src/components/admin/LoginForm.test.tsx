import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

const replace = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace }) }));

afterEach(() => { vi.unstubAllGlobals(); replace.mockReset(); });

const fill = async () => {
  await userEvent.type(screen.getByLabelText('Email'), 'x@dali.app');
  await userEvent.type(screen.getByLabelText('Mot de passe'), 'secret');
  await userEvent.click(screen.getByRole('button', { name: 'Se connecter' }));
};

describe('LoginForm', () => {
  it('posts the credentials and redirects to the dashboard on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ admin: { name: 'A' } }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    render(<LoginForm />);

    await fill();

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/admin'));
    expect(fetchMock).toHaveBeenCalledWith('/admin/api/login', expect.objectContaining({ method: 'POST' }));
  });

  it('shows the server message on failure and does not redirect', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Identifiants invalides' }), { status: 401 }),
    ));
    render(<LoginForm />);

    await fill();

    expect(await screen.findByRole('alert')).toHaveTextContent('Identifiants invalides');
    expect(replace).not.toHaveBeenCalled();
  });

  it('disables the button while submitting', async () => {
    let resolve!: (r: Response) => void;
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise<Response>((r) => { resolve = r; })));
    render(<LoginForm />);

    await fill();

    expect(screen.getByRole('button', { name: 'Connexion…' })).toBeDisabled();
    resolve(new Response(JSON.stringify({ admin: {} }), { status: 200 }));
  });
});
