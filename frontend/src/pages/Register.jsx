import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { registerUser } from '../redux/features/userSlice';
import ThemeToggle from '../components/ThemeToggle';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    

              

    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch registration action to Redux store
        dispatch(registerUser(formData));
        console.log('Registration successful:', formData);
        // Navigate to profile page after successful registration
        navigate('/profile');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <section className="register-section">
            <div className="register-header">
                <button onClick={handleGoBack} className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <h1>Sound stream</h1>
                <ThemeToggle />
            </div>

            <div className="middle">
                <h1>create new account</h1>

                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name"
                        placeholder='Name' 
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input 
                        type="email" 
                        name="email"
                        placeholder='Email' 
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Password' 
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <input type="submit" value={"Register"} />
                </form>
            </div>

            <p>already have an account ? <Link to="/login">Login</Link></p>
        </section>
    )
}

export default Register