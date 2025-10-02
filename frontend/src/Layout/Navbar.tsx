// src/components/Layout/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Hackaton2</Link>
        <div className="d-flex">
          <Link className="nav-link text-white" to="/">Inicio</Link>
          <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
          <Link className="nav-link text-white" to="/docs">Docs</Link>
          <Link className="nav-link text-white" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}