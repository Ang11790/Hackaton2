import React, { useEffect, useState } from 'react';

export default function Dashboard(){
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(()=> {
    fetch('http://localhost:4000/api/data')
      .then(r => r.json())
      .then(j => setItems(j || []))
      .catch(()=> alert('Error conectando al backend'));
  }, []);

  const add = async () => {
    if(!newItem) return;
    const res = await fetch('http://localhost:4000/api/data', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ item: newItem })
    });
    const j = await res.json();
    setItems(j);
    setNewItem('');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="mb-3">
        <input className="form-control d-inline-block w-50" value={newItem} onChange={e=>setNewItem(e.target.value)} placeholder="Nuevo item" />
        <button className="btn btn-success ms-2" onClick={add}>Agregar</button>
      </div>
      <ul className="list-group">
        {items.map((it, i) => <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
          {it}
          <small className="text-muted">#{i}</small>
        </li>)}
      </ul>
    </div>
  );
}
