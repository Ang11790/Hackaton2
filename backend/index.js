import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 4000;
const SECRET = 'hackaton2_secret';

app.use(cors());
app.use(bodyParser.json());

// Simulación de usuarios
const users = [
  { user: 'admin', pass: 'admin' },
  { user: 'test', pass: 'test' }
];

// Endpoint de login
app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;
  const found = users.find(u => u.user === user && u.pass === pass);
  if (found) {
    const token = jwt.sign({ user }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Middleware de autenticación
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ message: 'Token inválido' });
  }
}

// Endpoint de datos protegidos para dashboard
app.get('/api/data', auth, (req, res) => {
  res.json(['Dato 1', 'Dato 2', 'Dato 3']);
});

// Endpoint para agregar datos (simulado)
app.post('/api/data', auth, (req, res) => {
  // Aquí podrías guardar el dato en una base de datos
  res.json({ message: 'Dato agregado correctamente' });
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
