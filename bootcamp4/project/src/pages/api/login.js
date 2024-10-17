import { serialize } from 'cookie';
import { v4 as uuidv4 } from 'uuid';

let users = []; // Lista de usuarios en memoria
let sessions = {}; // Objeto para almacenar sesiones temporales

export default function handler(req, res) {
    try {
        if (req.method === 'POST') {
            console.log("Solicitud POST recibida en /api/login");
            console.log("Cuerpo de la solicitud:", req.body);

            const { email, password } = req.body;

            // Validación básica para asegurarse de que se envían los datos
            if (!email || !password) {
                console.log("Datos de entrada inválidos");
                return res.status(400).json({ message: 'Invalid input data' }); // Error 400
            }

            // Simula una verificación de credenciales (reemplaza con lógica real)
            if (email === 'admin@gmail.com' && password === 'password') {
                console.log("Credenciales válidas");

                // Generar un token de sesión único
                const sessionToken = uuidv4();

                // Almacenar la sesión en el objeto de sesiones
                sessions[sessionToken] = { email };

                // Configurar la cookie de sesión
                const cookie = serialize('sessionToken', sessionToken, {
                    httpOnly: true, // No accesible desde JavaScript del cliente
                    secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
                    sameSite: 'strict', // Protección CSRF
                    maxAge: 60 * 60 * 24, // 1 día en segundos
                    path: '/', // Disponible en toda la aplicación
                });

                // Establecer la cookie en la respuesta
                res.setHeader('Set-Cookie', cookie);

                return res.status(200).json({ message: 'Login exitoso' });
            } else {
                console.log("Credenciales inválidas");
                return res.status(401).json({ message: 'Credenciales inválidas' }); // Error 401
            }
        } else {
            console.log(`Método ${req.method} no permitido en /api/login`);
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Método ${req.method} no permitido`);
        }
    } catch (error) {
        console.error('Error del servidor:', error);
        return res.status(500).json({ message: 'An error occurred on the server' }); // Error 500
    }
}
