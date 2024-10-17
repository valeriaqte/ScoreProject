'use client'; // Indica que este es un Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                router.push('/profile');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error durante la solicitud:', error);
            setMessage('Error al conectarse al servidor.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Login</h2>
                    {message && <Alert variant={response.ok ? 'success' : 'danger'}>{message}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Cambiar Row y Col para centrar el botón */}
                        <Row className="justify-content-center">
                            <Col xs="auto">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginView;
