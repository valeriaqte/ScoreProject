import { serialize } from 'cookie';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Eliminar la cookie de sesión estableciendo su valor a vacío y expirando inmediatamente
        const cookie = serialize('sessionToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0),
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ message: 'Logout exitoso' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
