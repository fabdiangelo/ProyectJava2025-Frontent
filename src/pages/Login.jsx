/**
Para despues de iniciar sesión, se puede usar el token almacenado en localStorage para hacer peticiones a la API.

const token = decryptToken(localStorage.getItem('authToken'));

fetch('${API_URL}/profile', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`, // 👈 acá va el token
        'Content-Type': 'application/json'
    }
})
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFieldChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return;
        }
        setLoading(true);
        try {
            console.log(`${API_URL}/api/seguridad/login`)
            console.log(formData)
            console.log(JSON.stringify(formData))
            fetch(
                `${API_URL}/api/seguridad/login`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                if (data.ok) {
                    const token = data.token;
                    localStorage.setItem('authToken', encryptToken(token));
                    console.log('Token almacenado:', token);
                    navigate('/index')
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        mainContainer: {
            minHeight: '100vh',
            backgroundColor: '#F5F7FA',
            display: 'flex',
            flexDirection: 'column'
        },
        header: {
            backgroundColor: '#FFFFFF',
            padding: '1rem',
            borderBottom: '1px solid #E0E0E0'
        },
        headerContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        logo: {
            color: '#D4AF37',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none'
        },
        homeIcon: {
            color: '#D4AF37',
            cursor: 'pointer',
            fontSize: '1.5rem'
        },
        mainContent: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem'
        },
        formContainer: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto'
        },
        card: {
            backgroundColor: '#FFFFFF',
            border: '1px solid #D4AF37',
            borderRadius: '20px',
            padding: '2rem'
        },
        title: {
            color: '#D4AF37',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '2rem'
        },
        inputGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            color: '#333333'
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #E0E0E0'
        },
        loginButton: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#D4AF37',
            border: 'none',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontWeight: 'bold',
            cursor: 'pointer'
        },
        registerLink: {
            textAlign: 'center',
            marginTop: '1rem'
        },
        googleButton: {
            width: '100%',
            marginTop: '1.5rem',
            padding: '0.75rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
        },
        footer: {
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E0E0E0'
        }
    };

    return (
        <div style={styles.mainContainer}>
            <header style={styles.header}>
               
            </header>

            <main style={styles.mainContent}>
                <div style={styles.formContainer}>
                    <Card className="shadow-none" style={styles.card}>
                        <h1 style={styles.title}>INICIAR SESIÓN</h1>
                        <form onSubmit={handleLogin}>
                            <div style={styles.inputGroup}>
                                <label htmlFor="email" style={styles.label}>Email</label>
                                <InputText
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => handleFieldChange('email', e.target.value)}
                                    className="w-full"
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label htmlFor="password" style={styles.label}>Contraseña</label>
                                <Password
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => handleFieldChange('password', e.target.value)}
                                    toggleMask
                                    feedback={false}
                                    className="w-full"
                                    inputClassName="w-full"
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <Button
                                type="submit"
                                label="Login"
                                loading={loading}
                                style={styles.loginButton}
                            />

                            <div style={styles.registerLink}>
                                <span>¿No tienes una cuenta? </span>
                                <a 
                                    href="#" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/register');
                                    }}
                                    style={{ color: '#D4AF37', textDecoration: 'none' }}
                                >
                                    Registrarse
                                </a>
                            </div>

                            <Button
                                type="button"
                                style={styles.googleButton}
                                onClick={() => console.log('Google login')}
                            >
                                <i className="pi pi-google" />
                                <span>Sign in with Google</span>
                            </Button>
                        </form>
                    </Card>
                </div>
            </main>

            <footer style={styles.footer}>
                <p style={{ margin: 0, color: '#666666' }}>© Solariana 2025</p>
            </footer>
        </div>
    );
};

export default Login;
