'use client';

import { useState } from 'react';
import type { AdminDescriptorDetail } from '@/lib/admin/api';
import type { ScreenDescriptorValue } from '@/lib/admin/descriptor-types';
import { ListEditor } from './ListEditor';
import { DetailEditor } from './DetailEditor';
import { FormEditor } from './FormEditor';
import { WizardEditor } from './WizardEditor';
import { BlocksEditor } from './BlocksEditor';

export function DescriptorEditor({ initial }: { initial: AdminDescriptorDetail }) {
  const [value, setValue] = useState<ScreenDescriptorValue>(initial.json);
  const [version, setVersion] = useState(initial.version);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conflict, setConflict] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  async function onSave() {
    setSaving(true);
    setError(null);
    setConflict(false);
    setSavedMessage(null);
    try {
      const res = await fetch(`/admin/api/descriptors/${initial.key}/${initial.locale}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expectedVersion: version, json: value }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setConflict(true);
        return;
      }
      if (res.status === 400) {
        const message = Array.isArray(body.message)
          ? body.message.map((m: { field: string; message: string }) => `${m.field}: ${m.message}`).join(', ')
          : (body.message ?? 'Descripteur invalide.');
        setError(message);
        return;
      }
      if (!res.ok) {
        setError(body.message ?? 'Service indisponible, réessayez.');
        return;
      }
      setVersion(body.version);
      setValue(body.json);
      setSavedMessage(`Enregistré (version ${body.version}).`);
    } catch {
      setError('Service indisponible, réessayez.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-sable-700">Version {version}</span>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-dali-full bg-foret-800 px-6 py-2.5 text-sm font-medium text-ivoire hover:bg-foret-700 disabled:opacity-60"
        >
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
      {conflict ? (
        <p role="alert" className="rounded-dali-md bg-corail/10 px-4 py-2.5 text-sm text-terre-700">
          Ce descripteur a été modifié par quelqu&apos;un d&apos;autre depuis son chargement. Rechargez la page pour reprendre la dernière version.
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="rounded-dali-md bg-corail/10 px-4 py-2.5 text-sm text-terre-700">{error}</p>
      ) : null}
      {savedMessage ? (
        <p className="rounded-dali-md bg-foret-50 px-4 py-2.5 text-sm text-foret-800">{savedMessage}</p>
      ) : null}
      {value.type === 'list' ? <ListEditor value={value} onChange={setValue} /> : null}
      {value.type === 'detail' ? <DetailEditor value={value} onChange={setValue} /> : null}
      {value.type === 'form' ? <FormEditor value={value} onChange={(f) => setValue({ ...f, type: 'form' })} /> : null}
      {value.type === 'wizard' ? <WizardEditor value={value} onChange={setValue} /> : null}
      {value.type === 'blocks' ? <BlocksEditor value={value} onChange={setValue} /> : null}
    </div>
  );
}
