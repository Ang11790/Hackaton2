import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Mi WebApp</Link>
          <div className="d-flex">
            <Link className="nav-link text-white" to="/">Inicio</Link>
            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
            <Link className="nav-link text-white" to="/docs">Docs</Link>
            <Link className="nav-link text-white" to="/login">Login</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </div>

      <footer className="bg-dark text-white text-center p-3 mt-5">
        © 2025 - Proyecto Ingeniería de Sistemas
      </footer>
    </Router>
  );
}
