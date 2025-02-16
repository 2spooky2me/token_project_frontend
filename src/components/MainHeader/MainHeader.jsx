import React from 'react';
import './MainHeader.css';
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {logout} from "../../store/auth-slice";

const MainHeader = () => {
    const firstName = useSelector((state) => state.auth.firstName);
    const lastName = useSelector((state) => state.auth.lastName);
    const customerName = firstName && lastName ? `${firstName} ${lastName}` : '';

    const dispatch = useDispatch();
    const location = useLocation();


    const handleLogout = () => {
        dispatch(logout());
    };

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    return (
        <header className='main-header'>
            <div className='welcome-message'>
                Welcome, {customerName}!
            </div>
            <nav className='main-navigation'>
                <ul>
                    <li><Link to="/home" className="coupons">My Coupons</Link></li>
                    <li><Link to="/store" className="store">Store</Link></li>
                    <li><Link to="/updateUserDetails" className="updateUserDetails">User Settings</Link></li>
                    <li onClick={handleLogout}><Link to="/login" className="logout">Logout</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
