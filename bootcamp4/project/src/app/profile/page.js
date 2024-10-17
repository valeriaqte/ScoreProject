'use client'; // Indica que este es un Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Función para obtener la información del usuario
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Asegura que las cookies se envíen con la solicitud
                });

                const data = await response.json();

                if (response.ok) {
                    setUser(data.user);
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                setMessage('Error al conectarse al servidor.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                // Redirigir al usuario a la página de login después del logout
                router.push('/');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error durante el logout:', error);
            setMessage('Error al conectarse al servidor.');
        }
    };

    if (loading) {
        return <p>Cargando perfil...</p>;
    }

    if (message) {
        return <p>{message}</p>;
    }

    return (
        <div>
            <h2>Perfil de Usuario</h2>
            {user ? (
                <div>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Agrega más información del usuario según sea necesario */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>No se encontró información del usuario.</p>
            )}
        </div>
    );
}

export default ProfilePage;
