'use client'; // Indica que este es un Client Component

import React, { useState } from 'react';
import LoginView from '../views/LoginView.js';
import RegisterView from '../views/RegisterView.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap

function HomePage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
                {isLogin ? <LoginView /> : <RegisterView />}
                <button 
                    className="btn btn-primary mt-3 w-100" 
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? '¿No tienes una cuenta? Registrarse' : '¿Ya tienes una cuenta? Login'}
                </button>
            </div>
        </div>
    );
}

export default HomePage;
