import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/users.services';

function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            navigate('/login'); // redirige al login tras registrarse
        } catch (error) {
            setError(error.response?.data?.message || 'Error al registrarse');
        }
    };

    return (
        <div>
            <h1>Crear cuenta</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                />
                {error && <p>{error}</p>}
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;