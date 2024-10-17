// src/pages/api/register.js

// Nota: En un entorno de producción, deberías usar una base de datos para almacenar usuarios.
// Para este ejemplo, usaremos una estructura en memoria. Ten en cuenta que los datos se perderán al reiniciar el servidor.

let users = []; // Arreglo en memoria para almacenar usuarios

export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log("Solicitud POST recibida en /api/register"); // Log para depuración
        console.log("Cuerpo de la solicitud:", req.body); // Ver el cuerpo recibido

        const { username, password, name, email, avatar } = req.body;

        // Validaciones básicas
        if (!username || !password || !name || !email  || username.trim() === '' || password.trim() === '') {
            res.status(400).json({ message: 'Username, name, email y password son requeridos.' });
            return;
        }

        // Verificar si el usuario ya existe
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            res.status(409).json({ message: 'El usuario ya existe.' });
            return;
        }

        // Crear nuevo usuario
        const newUser = { username, password, email, avatar  }; // Hay que hashear la contraseña
        users.push(newUser);

        console.log("Usuario registrado:", newUser);

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } else {
        console.log(`Método ${req.method} no permitido en /api/register`); // Log para depuración
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
