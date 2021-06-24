import React, { useContext } from 'react';
import { FaFacebook } from 'react-icons/fa'
import { FirebaseContext } from '../firebase';

const Header = () => {
    
    const { user, firebase } = useContext(FirebaseContext)

    return (
        <div className="header">
            <h1 className="header-title">Twitcoders</h1>
            { user ?
            (
                <button onClick={() => firebase.logout()} type="submit" className="login-btn">
                    <FaFacebook />Logout
                </button>
            ) 
            : 
            (
                <button onClick={() => firebase.login('facebook')} type="submit" className="login-btn">
                    <FaFacebook />Login
                </button>
            )
            }
        </div>
    );
}

export default Header;
