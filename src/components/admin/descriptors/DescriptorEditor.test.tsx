import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DescriptorEditor } from './DescriptorEditor';
import type { AdminDescriptorDetail } from '@/lib/admin/api';

const initial: AdminDescriptorDetail = {
  key: 'fiscalite', locale: 'fr', version: 1,
  json: { type: 'detail', title: 'Fiscalité', sections: [] },
  updatedAt: '2026-07-01T00:00:00.000Z',
};

describe('DescriptorEditor', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('dispatches to DetailEditor for a detail descriptor and shows the current version', () => {
    render(<DescriptorEditor initial={initial} />);
    expect(screen.getByDisplayValue('Fiscalité')).toBeInTheDocument();
    expect(screen.getByText('Version 1')).toBeInTheDocument();
  });

  it('saves successfully and bumps the displayed version', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ key: 'fiscalite', locale: 'fr', version: 2, json: initial.json, updatedAt: '2026-07-02T00:00:00.000Z' }),
    });
    render(<DescriptorEditor initial={initial} />);
    await userEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
    expect(fetch).toHaveBeenCalledWith(
      '/admin/api/descriptors/fiscalite/fr',
      expect.objectContaining({ method: 'PUT', body: JSON.stringify({ expectedVersion: 1, json: initial.json }) }),
    );
    expect(await screen.findByText('Version 2')).toBeInTheDocument();
  });

  it('shows a conflict message on 409 without discarding local edits or bumping the version', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false, status: 409, json: async () => ({ message: 'stale' }),
    });
    render(<DescriptorEditor initial={initial} />);
    await userEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/modifié par quelqu.un d.autre/);
    expect(screen.getByText('Version 1')).toBeInTheDocument();
  });

  it('shows field errors on 400', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false, status: 400, json: async () => ({ message: [{ field: 'sections', message: 'Required' }] }),
    });
    render(<DescriptorEditor initial={initial} />);
    await userEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('sections: Required');
  });

  it('shows a generic message when the network fails', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('offline'));
    render(<DescriptorEditor initial={initial} />);
    await userEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Service indisponible, réessayez.');
  });

  it('renders a live preview alongside the editor, reflecting the initial value', () => {
    render(<DescriptorEditor initial={initial} />);
    // The title appears twice: once in the editable input, once in the preview heading.
    expect(screen.getAllByText('Fiscalité').length + screen.getAllByDisplayValue('Fiscalité').length).toBeGreaterThanOrEqual(2);
  });
});
