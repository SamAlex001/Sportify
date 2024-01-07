import { FcGoogle } from "react-icons/fc";
import Logo from "../assets/Login_SignUP_Logo.png"
import '../styles/signup.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignUp = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Passing User Data
    async function Register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            alert('Sign Up Successfull');
        } else {
            alert('Sign Up Failed');
        }
    }

    return (
        <div className='signup-main-contianer'>
            <div className="logo-container">
                <img src={Logo} alt="Sportify_Logo" />
            </div>
            <div className="form-google-signup-wrapper">
                <form className='signup-form-container' action="POST" onSubmit={Register}>
                    <div className="username-wrapper">
                        <div className="input-text prim--color">Username</div>
                        <input type="text" className='custom-signup-input' id='username' size={30} required onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <br />
                    <div className="email-wrapper">
                        <div className="input-text prim--color">Email</div>
                        <input type="email" className='custom-signup-input' id='email' size={30} required onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <br />
                    <div className="password-wrapper">
                        <div className="input-text prim--color">Password</div>
                        <input type="password" className='custom-signup-input' id='password' size={30} required onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <br />
                    <button type="submit" value="Sign Up" className='signup-form-btn'>Sign Up</button>
                </form>
                <h2 className="tert--color">OR</h2>
                <div className="google-login-container">
                    <button className='google-login-btn'>
                        <FcGoogle className="signup-icon" />
                        sign up with google
                    </button>
                </div>
                <button className="login-ref-link-container tert--color" onClick={() => { navigate("/login") }}>
                    already a user? click here to login
                </button>
            </div>
        </div>
    )
};