import React from 'react';
import './Docs.css'; // <--- Importación del CSS

export default function Docs() {
  return (
    <div className="docs-container">
      <header className="docs-header">
        <h1>Documentación del Proyecto</h1>
        <p className="subtitle">Ejemplos y líneas de profundización en temas clave de desarrollo.</p>
      </header>

      <section className="docs-content">
        <h2>Áreas de Profundización</h2>
        <p>A continuación, se detallan los módulos y tecnologías clave exploradas en este proyecto:</p>

        <ul className="docs-list">
          <li className="list-item">
            <h3 className="list-title">🧠 Inteligencia Artificial (IA)</h3>
            <p className="list-description">Implementar un pequeño modelo de **Machine Learning** o integrar una **API de servicios de IA** (como un modelo de lenguaje o visión por computadora).</p>
          </li>
          
          <li className="list-item">
            <h3 className="list-title">🔒 Ciberseguridad</h3>
            <p className="list-description">Manejo de la **Autenticación (Login)**, implementación de la seguridad básica y almacenamiento seguro de **tokens** (JWT) en el frontend/backend.</p>
          </li>
          
          <li className="list-item">
            <h3 className="list-title">💻 Repositorio y Estructura</h3>
            <p className="list-description">Mantener una estructura clara en **GitHub**, incluyendo un archivo **README** completo con instrucciones de instalación, uso y contribución.</p>
          </li>
        </ul>
      </section>
      
      <footer className="docs-footer">
        <p>La clave para un proyecto exitoso es una documentación clara.</p>
      </footer>
    </div>
  );
}