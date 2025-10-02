// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import './styles/App.css';

export default function App() {
  return (
    <Router>
      <div className="router-container">
        <Navbar /> {/* <--- Usando el componente */}

        <div className="container mt-4 main-content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </div>

        <Footer /> {/* <--- Usando el componente */}
      </div>
    </Router>
  );
}