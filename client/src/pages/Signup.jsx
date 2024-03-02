import Logo from "../assets/Login_SignUP_Logo.png"
import '../styles/signup.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { SignUpModal } from "../components/Modal";
import { Loader } from "../components/Loaders";
import { toast } from 'react-toastify';

export const SignUp = () => {

    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const toggleLoading = () => {
        setLoading(!loading);
    }

    // Passing User Data
    async function Register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            toggleModal();
            toggleLoading();
            setTimeout(() => {
                navigate('/login');
            }, 1000)
        } else {
            toast.error('Sign Up Failed!');
        }
    }

    return (
        <>
            <Navbar />
            {!loading &&
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
                        <button className="login-ref-link-container tert--color" onClick={() => { navigate("/login") }}>
                            already a user? click here to login
                        </button>
                    </div>
                </div>}
            <SignUpModal isOpen={modalOpen} closeModal={toggleModal}
                title={"Sign Up Successful"}
            />
            {loading && <div className="signup-loading"><Loader /></div>}
        </>
    )
};