import { FcGoogle } from "react-icons/fc";
import Logo from "../assets/Login_SignUP_Logo.png"
import '../styles/signup.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const SignUp = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function Submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5173/signup", {
                username, email, password
            })
            .then(res => {
                if (res.data == "exist") {
                    alert("User Already Exists!");
                } else if (res.data == "notexist") {
                    console.log("Sign Up Done")
                    // navigate("/home", { state: { id: email } })
                }
            })
            .catch(err => {
                alert("Wrong Details");
                console.log(err);
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='signup-main-contianer'>
            
            <div className="logo-container">
                <img src={Logo} alt="Sportify_Logo" />
            </div>
            
            <div className="form-google-signup-wrapper">
                <form className='signup-form-container' action="POST">
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
                    <button type="submit" value="Sign Up" className='signup-form-btn' onClick={Submit}>Sign Up</button>
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