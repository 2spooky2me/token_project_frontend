import React, {useState} from 'react';
import './UpdateUserDetails.css';
import {useDispatch} from "react-redux";
import {updateUserName} from "../../store/auth-slice";

const UserDetailUpdate = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const token = localStorage.getItem('token');

    const dispatch = useDispatch();

    const handleUpdateEmail = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/customer/update/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({email}),
            });
            if (!response.ok) {
                    throw new Error('Failed to update email');
                }


            alert('Email updated successfully!');
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/customer/update/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({password}),
            });
            if (!response.ok) throw new Error('Failed to update password');

            alert('Password updated successfully!');
            setPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Error updating password');
        }
    };

    const handleUpdateName = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/customer/update/nameAndLastName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({firstName, lastName}),
            });
            if (!response.ok) throw new Error('Failed to update name');

            alert('Name updated successfully!');

            dispatch(updateUserName({ firstName, lastName }));

            setFirstName('');
            setLastName('');
        } catch (error) {
            console.error('Error updating name:', error);
            alert('Error updating name');
        }
    };

    return (
        <div className="userUpdateWrapper">
            <h2>Update Your Details</h2>
            <div>
                <input className="userUpdateInput" type="email" value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="New Email"/>
                <button className="userUpdateButton" onClick={handleUpdateEmail}>Update
                    Email
                </button>
            </div>
            <div>
                <input className="userUpdateInput" type="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="New Password"/>
                <button className="userUpdateButton" onClick={handleUpdatePassword}>Update
                    Password
                </button>
            </div>
            <div>
                <input className="userUpdateInput" type="text" value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                       placeholder="First Name"/>
                <input className="userUpdateInput" type="text" value={lastName}
                       onChange={(e) => setLastName(e.target.value)}
                       placeholder="Last Name"/>
                <button className="userUpdateButton" onClick={handleUpdateName}>Update
                    Name
                </button>
            </div>
        </div>
    );
};

export default UserDetailUpdate;
