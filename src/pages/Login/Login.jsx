import React, {useState} from "react";
import './Login.css';
import {FaUser, FaLock} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../store/auth-slice"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/api/customer/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const {token, firstName, lastName} = await response.json();
            console.log('Token:', token);

            dispatch(login({token, firstName, lastName}));

            navigate('/home');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Email" required value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock className="icon"/>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
