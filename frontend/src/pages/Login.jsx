import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/features/userSlice'
import ThemeToggle from '../components/ThemeToggle'
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
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
        // Dispatch login action to Redux store
        dispatch(loginUser(formData));
        console.log('Login successful:', formData);
        // Navigate to home page after successful login
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <section className="login-section">
            <div className="login-header">
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
                <h1>Welcome back</h1>

                <form onSubmit={handleSubmit}>
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
                    <input type="submit" value={"Login"} />
                </form>
            </div>

            <p>create an account <Link to="/register">register</Link></p>
        </section>
    )
}

export default Login