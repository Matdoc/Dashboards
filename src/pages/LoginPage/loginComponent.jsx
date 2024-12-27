import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginComponent.css";
import axios from "axios";
import { color } from "framer-motion";

let localData = 
{
    "name": "Admin",
    "email": "admin@gmail.com",
    "phone": "6379604597",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFudG9ueSB2aXNoYWwiLCJpYXQiOjE3MzUyOTQ4NTYsImV4cCI6MTczNTI5ODQ1Nn0.kGvUkD96ODaQm6jkLByxskoC4mkppbwP8vY3zYn9P8I"
}

const LoginComponent = ({ onLoginSuccess }) => {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    // const api = "http://localhost:3000/franchisebhoomi-api";
    // console.log("API URL:", api);

    const isValidEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const isValidPhone = (value) => {
        return /^\d{10}$/.test(value);
    };

    const isValidPassword = (value) => {
        console.log("Password", value);
        if (value.length < 8) {
            return false;
        }
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    };

    const signinValidation = async (userid, password) => {
        try {
           
            // let result = await axios.post(`${api}/signin`, { userid, password });
            // if (result.status === 200) {
            //     let userData = { ...result.data.responseObject, loginSuccess: true };
            //     onLoginSuccess(userid , userData);
            //     navigate(`/${userid}`); // Redirect
            // }
                let userData = { ...localData, loginSuccess: true };
                onLoginSuccess(userid , userData);
                navigate(`home/${userid}`); // Redirect
        } catch (error) {
            console.error("Error during sign-in:", error);
            setError({ signin: "Invalid User ID or Password. Please try again." });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!userid) {
            validationErrors.userid = "User ID is required";
        } else if (!isValidEmail(userid) && !isValidPhone(userid)) {
            validationErrors.userid = "Please enter a valid email or phone number";
        }

        if (!isValidPassword(password)) {
            validationErrors.password = "Please enter a valid password";
        }

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        signinValidation(userid, password);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-image"></div>
                <div className="login-content">
                    <h1 className="login-title">Welcome Back</h1>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="userid">User ID</label>
                            <input
                                type="text"
                                id="userid"
                                placeholder="Enter your email or phone number"
                                value={userid}
                                onChange={(e) => setUserid(e.target.value)}
                                required
                            />
                            {error.userid && <span className="error-message">{error.userid}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="eye-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "😃"}
                                </span>
                            </div>
                            {error.password && <span className="error-message">{error.password}</span>}
                        </div>
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                    <p className="forgetpassword-link">
                        <span style={{ color: "white" }}>Forgot your password?</span> <a href="/signup">Forget password</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;