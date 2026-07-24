import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArrayField } from './ArrayField';

interface Row { label: string; }

describe('ArrayField', () => {
  it('renders one block per item via renderItem', () => {
    render(
      <ArrayField<Row>
        items={[{ label: 'A' }, { label: 'B' }]}
        onChange={vi.fn()}
        newItem={() => ({ label: '' })}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('appends a new item on "+ Ajouter"', async () => {
    const onChange = vi.fn();
    render(
      <ArrayField<Row>
        items={[{ label: 'A' }]}
        onChange={onChange}
        newItem={() => ({ label: 'new' })}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith([{ label: 'A' }, { label: 'new' }]);
  });

  it('removes an item on its delete button', async () => {
    const onChange = vi.fn();
    render(
      <ArrayField<Row>
        items={[{ label: 'A' }, { label: 'B' }]}
        onChange={onChange}
        newItem={() => ({ label: '' })}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    await userEvent.click(screen.getAllByRole('button', { name: 'Supprimer' })[0]);
    expect(onChange).toHaveBeenCalledWith([{ label: 'B' }]);
  });

  it('swaps two items on move down / move up', async () => {
    const onChange = vi.fn();
    render(
      <ArrayField<Row>
        items={[{ label: 'A' }, { label: 'B' }]}
        onChange={onChange}
        newItem={() => ({ label: '' })}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    await userEvent.click(screen.getAllByRole('button', { name: 'Descendre' })[0]);
    expect(onChange).toHaveBeenCalledWith([{ label: 'B' }, { label: 'A' }]);
  });

  it('disables move-up on the first item and move-down on the last', () => {
    render(
      <ArrayField<Row>
        items={[{ label: 'A' }, { label: 'B' }]}
        onChange={vi.fn()}
        newItem={() => ({ label: '' })}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    const ups = screen.getAllByRole('button', { name: 'Monter' });
    const downs = screen.getAllByRole('button', { name: 'Descendre' });
    expect(ups[0]).toBeDisabled();
    expect(downs[downs.length - 1]).toBeDisabled();
  });

  it('gives renderItem an onItemChange that patches only that item', async () => {
    const onChange = vi.fn();
    function Editable({ item, onItemChange }: { item: Row; onItemChange: (next: Row) => void }) {
      return <button onClick={() => onItemChange({ label: item.label + '!' })}>{item.label}</button>;
    }
    render(
      <ArrayField<Row>
        items={[{ label: 'A' }, { label: 'B' }]}
        onChange={onChange}
        newItem={() => ({ label: '' })}
        renderItem={(item, _i, onItemChange) => <Editable item={item} onItemChange={onItemChange} />}
      />,
    );
    await userEvent.click(screen.getByText('A'));
    expect(onChange).toHaveBeenCalledWith([{ label: 'A!' }, { label: 'B' }]);
  });
});
