import React, { useState } from 'react';
import './Login.css'; // <--- Importación del CSS

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Error en login');
      }
    } catch (err) {
      setError('No se pudo conectar al backend.');
    }
    setLoading(false);
  };

  return (
    // Se elimina el estilo inline (maxWidth y marginTop) y se deja solo la clase
    <div className="card shadow p-4 mx-auto login-card">
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Usuario"
          value={user}
          onChange={e => setUser(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)}
          disabled={loading}
        />
      </div>
      <button
        className="btn btn-primary w-100"
        onClick={handleLogin}
        disabled={loading || !user || !pass}
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        ) : null}
        Entrar
      </button>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">{error}</div>
      )}
      <p className="mt-3 text-center"><small>Prueba: <b>user=admin</b>, <b>pass=1234</b></small></p>
    </div>
  );
}