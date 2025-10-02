import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/data');
      if (!res.ok) throw new Error('Error al obtener datos');
      const j = await res.json();
      setItems(j || []);
    } catch (e) {
      setError('Error conectando al backend');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const add = async () => {
    if (!newItem) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: newItem })
      });
      if (!res.ok) throw new Error('Error al agregar');
      const j = await res.json();
      setItems(j);
      setNewItem('');
    } catch (e) {
      setError('No se pudo agregar el elemento');
    }
    setLoading(false);
  };

  const remove = async (idx: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:4000/api/data/${idx}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Error al eliminar');
      const j = await res.json();
      setItems(j);
    } catch (e) {
      setError('No se pudo eliminar el elemento');
    }
    setLoading(false);
  };

  return (
    <div className="card shadow p-4 mx-auto" style={{ maxWidth: 600, marginTop: 40 }}>
      <h2 className="mb-4 text-center">Dashboard</h2>
      <div className="mb-3 d-flex">
        <input
          className="form-control"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder="Nuevo item"
          disabled={loading}
        />
        <button className="btn btn-success ms-2" onClick={add} disabled={loading || !newItem}>
          {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
          Agregar
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group mt-3">
        {items.map((it, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{it}</span>
            <div>
              <button className="btn btn-outline-danger btn-sm" onClick={() => remove(i)} disabled={loading}>
                Eliminar
              </button>
              <span className="text-muted ms-2">#{i}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
