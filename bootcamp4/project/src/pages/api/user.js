import { parse } from 'cookie';

let sessions = {}; // Asegúrate de que esta referencia esté sincronizada con tu login.js

export default function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { cookie } = req.headers;
            if (!cookie) {
                return res.status(401).json({ message: 'No autorizado, sesión no encontrada' });
            }

            const parsedCookies = parse(cookie);
            const sessionToken = parsedCookies.sessionToken;

            if (!sessionToken || !sessions[sessionToken]) {
                return res.status(401).json({ message: 'Invalid or expired JWT token.' });
            }

            const user = sessions[sessionToken];

            return res.status(200).json({ message: 'Usuario autenticado', user });
        } else {
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Método ${req.method} no permitido`);
        }
    } catch (error) {
        console.error('Error del servidor:', error);
        return res.status(500).json({ message: 'An error occurred on the server.' });
    }
}
