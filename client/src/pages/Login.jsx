import { FcGoogle } from "react-icons/fc";
import '../styles/login.css';
import Logo from "../assets/Login_SignUP_Logo.png"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navbar } from "../components/Navbar";

export const Login = () => {

    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function Login(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/auth/login/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                navigate("/")
            })
            console.log('Login Successfull');
        } else {
            console.log('Login Failed');
        }
    }

    return (
        <>
            <Navbar />
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
                    <button className="login-ref-link-container tert--color" onClick={() => navigate("/signup")}>
                        don't have an account? click here to sign up
                    </button>
                </div>
            </div>
        </>
    )
}