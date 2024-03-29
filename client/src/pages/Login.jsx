import '../styles/login.css';
import Logo from "../assets/Login_SignUP_Logo.png"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navbar } from "../components/Navbar";
import { LoginModal } from "../components/Modal";
import { Loader } from '../components/Loaders';
import { IoIosAlert } from "react-icons/io";


export const Login = () => {

    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    const [loginError, setLoginError] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const toggleLoading = () => {
        setLoading(!loading);
    }

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
                toggleModal();
                toggleLoading();
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
        } else {
            setLoginError(!loginError);
            // console.log('Login Failed');
        }
    }

    return (
        <>
            <Navbar />
            {!loading && <div className='login-main-contianer'>
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
                        {loginError && <div className="login-error-msg"><IoIosAlert />&nbsp; Incorrect Username or Password</div>}
                        <br />
                        <input type="submit" value="Login" className='login-form-btn' />
                    </form>
                    <button className="login-ref-link-container tert--color" onClick={() => navigate("/signup")}>
                        don't have an account? click here to sign up
                    </button>
                </div>
            </div>}
            <LoginModal isOpen={modalOpen} closeModal={toggleModal}
                title={`Welcome ${username}`}
                description={'Login Successful!'}
            />
            {loading && <div className="login-loading"><Loader /></div>}
        </>
    )
}