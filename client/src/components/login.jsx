import { FcGoogle } from "react-icons/fc";
import Logo from "../assets/Login_SignUP_Logo.png"
import '../styles/login.css';
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    return (
        <div className='login-main-contianer'>
            <div className="logo-container">
                <img src={Logo} alt="Sportify_Logo" />
            </div>
            <div className="form-google-login-wrapper">
                <form className='login-form-container' action="GET">
                    <div className="username-wrapper">
                        <div className="input-text prim--color">Username</div>
                        <input type="text" className='custom-login-input' id='username' size={30} required />
                    </div>
                    <br />
                    <div className="password-wrapper">
                        <div className="input-text prim--color">Password</div>
                        <input type="password" className='custom-login-input' id='password' size={30} required />
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