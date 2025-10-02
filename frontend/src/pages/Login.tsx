import React, { useState } from 'react';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        alert(data.message || 'Error en login');
      }
    } catch (err) {
      alert('No se pudo conectar al backend.');
    }
  };

  return (
    <div className="card p-4" style={{maxWidth: 480}}>
      <h2>Iniciar Sesión</h2>
      <input className="form-control mb-2" placeholder="Usuario" value={user} onChange={e=>setUser(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} />
      <button className="btn btn-primary" onClick={handleLogin}>Entrar</button>
      <p className="mt-2"><small>Prueba: user=admin, pass=1234</small></p>
    </div>
  );
}
