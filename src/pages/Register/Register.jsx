import React, { useState } from "react";
import './Register.css';
import { FaUser, FaLock } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const navigator = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== verifyPassword) {
            alert("Passwords do not match");
            return;
        }

        const payload = {
            firstName,
            lastName,
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:8081/api/customer/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                 new Error("Failed to register");
            }

            alert("Registration successful!");
            navigator('/login')

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to register");
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="inpute-box">
                    <input type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <FaUser className="icon"/>
                </div>

                <div className="inpute-box">
                    <input type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <FaUser className="icon"/>
                </div>

                <div className="inpute-box">
                    <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FaUser className="icon"/>
                </div>

                <div className="inpute-box">
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <FaLock className="icon"/>
                </div>

                <div className="inpute-box">
                    <input type="password" placeholder="Verify Password" required value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
                    <FaLock className="icon"/>
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
