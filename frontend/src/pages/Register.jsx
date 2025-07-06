import { useNavigate } from 'react-router-dom';

import ThemeToggle from '../components/ThemeToggle';
import './Register.css';
import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };


    function handleRegister(event){
        event.preventDefault()

        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value

        axios.post("http://localhost:3000/auth/register",{
            username,password
        },{
            withCredentials: true,
        }).then(response=>{
            console.log(response.data)
            navigate("/")
        })
    }



    



   

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

                <form onSubmit={handleRegister} action="">
                    <input id="username" type="text" placeholder='Username' />
                    <input id="password" type="password" placeholder="Password"/>
                    <input type="submit" value={"Register"} />
                </form>

            </div>

            <p>already have an account ? <Link to="/login">Login</Link></p>
        </section>
    )
}

export default Register