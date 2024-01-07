import { FcGoogle } from "react-icons/fc";
import Logo from "../assets/Login_SignUP_Logo.png"
import '../styles/login.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function Login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            setRedirect(!redirect); // navigate to home
            alert('Login Successfull');
        } else {
            alert('Login Failed');
        }
    }

    // Authenticated User redirected to home page
    if (redirect) {
        navigate('/');
    }

    return (
        <div className='login-main-contianer'>
            <div className="logo-container">
                <img src={Logo} alt="Sportify_Logo" />
            </div>
            <div className="form-google-login-wrapper">
                <form className='login-form-container' action="POST" onSubmit={Login}>
                    <div className="username-wrapper">
                        <div className="input-text prim--color">Username</div>
                        <input type="text" className='custom-login-input' id='username' size={30} required onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <br />
                    <div className="password-wrapper">
                        <div className="input-text prim--color">Password</div>
                        <input type="password" className='custom-login-input' id='password' size={30} required onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <br />
                    <input type="submit" value="Login" className='login-form-btn' />
                </form>
                <h2 className="tert--color">OR</h2>
                <div className="google-login-container">
                    <button className='google-login-btn'>
                        <FcGoogle className="login-icon" />
                        login with google
                    </button>
                </div>
                <button className="login-ref-link-container tert--color" onClick={() => navigate("/signup")}>
                    don't have an account? click here to sign up
                </button>
            </div>
        </div>
    )
}