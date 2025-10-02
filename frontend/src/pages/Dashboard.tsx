import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // <--- Importación del CSS

export default function Dashboard() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      // Nota: El token de autenticación debería ser enviado aquí
      const token = localStorage.getItem('token'); 
      const res = await fetch('http://localhost:4000/api/data', {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error al obtener datos');
      const j = await res.json();
      setItems(j || []);
    } catch (e) {
      setError('Error conectando al backend o token inválido.');
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
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/data', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
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
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:4000/api/data/${idx}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
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
    // Se elimina el estilo inline y se usa la clase dashboard-card
    <div className="card shadow p-4 mx-auto dashboard-card"> 
      <h2 className="mb-4 text-center dashboard-title">Panel de Datos (Dashboard)</h2>
      
      {/* Sección de Agregar Nuevo Item */}
      <div className="mb-3 d-flex add-item-section">
        <input
          className="form-control"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder="Escribe un nuevo elemento de la lista..."
          disabled={loading}
          aria-label="Nuevo elemento"
        />
        <button 
          className="btn btn-success ms-2 add-button" 
          onClick={add} 
          disabled={loading || !newItem}
        >
          {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" /> : null}
          Agregar
        </button>
      </div>

      {/* Mensaje de Error */}
      {error && <div className="alert alert-danger error-alert">{error}</div>}
      
      {/* Lista de Items */}
      <ul className="list-group mt-3 data-list">
        {items.length === 0 && !loading && !error && (
            <li className="list-group-item text-center text-muted empty-list">
                La lista está vacía. ¡Agrega un elemento!
            </li>
        )}
        {items.map((it, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center list-item">
            <span className="item-text">{it}</span>
            <div className="item-actions">
              <button 
                className="btn btn-outline-danger btn-sm remove-button" 
                onClick={() => remove(i)} 
                disabled={loading}
              >
                Eliminar
              </button>
              <span className="text-muted ms-2 item-index">#{i}</span>
            </div>
          </li>
        ))}
        {loading && items.length === 0 && (
             <li className="list-group-item text-center loading-item">
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Cargando datos...
            </li>
        )}
      </ul>
    </div>
  );
}