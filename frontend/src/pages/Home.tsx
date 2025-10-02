import React, { useState } from 'react';
import './Home.css'; // <--- Importación del CSS

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    correo: '',
    direccion: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos (ej: a una API)
    console.log('Datos enviados:', formData);
    alert('¡Registro exitoso! Pronto te contactaremos.');
    // Opcional: limpiar formulario
    setFormData({ nombre: '', celular: '', correo: '', direccion: '' });
  };

  return (
    <div className="home-container">
      {/* SECCIÓN HERO - Destaca el tema de IA */}
      <header className="hero">
        <div className="hero-content">
          <h1>Explora el Universo de la Inteligencia Artificial</h1>
          <p>La revolución digital que está redefiniendo el futuro de los negocios y la vida cotidiana.</p>
          <button className="cta-button">Ver Soluciones de IA</button>
        </div>
      </header>

      {/* SECCIÓN DE CONTENIDO */}
      <section className="ia-content">
        <h2>¿Qué es la IA?</h2>
        <p>La Inteligencia Artificial es la simulación de procesos de inteligencia humana por parte de máquinas, especialmente sistemas informáticos. Estos procesos incluyen el aprendizaje, el razonamiento y la autocorrección. Desde el aprendizaje automático (Machine Learning) hasta las redes neuronales profundas (Deep Learning), la IA impulsa la innovación.</p>
        <div className="features">
          <div className="feature-item">🤖 Aprendizaje Automático</div>
          <div className="feature-item">💡 Procesamiento de Lenguaje Natural</div>
          <div className="feature-item">⚙️ Visión por Computadora</div>
        </div>
      </section>

      {/* SECCIÓN DE REGISTRO - El formulario solicitado */}
      <section className="contact-form-section">
        <div className="form-wrapper">
          <h2>Únete a Nuestra Comunidad IA</h2>
          <p>Déjanos tus datos para recibir noticias exclusivas, invitaciones a webinars y ofertas especiales sobre nuestras soluciones de IA.</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre Completo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="celular"
              placeholder="Número Celular"
              value={formData.celular}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo Electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección Residencial"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-button">Registrarme Ahora</button>
          </form>
        </div>
      </section>

      {/* Pie de página simple para completar la estructura */}
    </div>
  );
}