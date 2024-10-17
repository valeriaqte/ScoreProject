// src/app.js

import express from 'express';
import loginRoute from './pages/api/login.js'; // Incluye .js

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Hola Mundo");

// Middleware para parsear JSON
app.use(express.json());

// Usar la ruta de login
app.use('/api/login', loginRoute);

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('¡Hola! El servidor está funcionando correctamente.');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
