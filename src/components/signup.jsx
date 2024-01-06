import { FcGoogle } from "react-icons/fc";
import Logo from "../assets/Login_SignUP_Logo.png"
import '../styles/signup.css';
import { useNavigate } from "react-router-dom";

export const SignUp = () => {

    const navigate = useNavigate();
    return (
        <div className='registration-main-contianer'>
            <div className="logo-container">
                <img src={Logo} alt="Sportify_Logo" />
            </div>
            <div className="form-google-signup-wrapper">
                <form className='registration-form-container' action="">
                    <div className="username-wrapper">
                        <div className="input-text prim--color">Username</div>
                        <input type="text" className='custom-signup-input' id='username' size={30} required />
                    </div>
                    <br />
                    <div className="email-wrapper">
                        <div className="input-text prim--color">Email</div>
                        <input type="email" className='custom-signup-input' id='email' size={30} required />
                    </div>
                    <br />
                    <div className="password-wrapper">
                        <div className="input-text prim--color">Password</div>
                        <input type="password" className='custom-signup-input' id='password' size={30} required />
                    </div>
                    <br />
                    <input type="submit" value="Sign Up" className='signup-form-btn' />
                </form>
                <h2 className="tert--color">OR</h2>
                <div className="google-login-container">
                    <button className='google-login-btn'>
                        <FcGoogle className="signup-icon" />
                        sign up with google
                    </button>
                </div>
                <button className="login-ref-link-container tert--color" onClick={() => {navigate("/login")}}>
                    already a user? click here to login
                </button>
            </div>
        </div>
    )
}