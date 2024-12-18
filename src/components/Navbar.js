import React from 'react';
import './Navbar.css'

import { useAuth } from '../auth/Autentication';
import { Link } from 'react-router-dom';

function Navbar(){
    const {user , logout} = useAuth();

    return(
        <div className='Navbar-container'>
             <h1>eKart</h1>
         <div className='Navbar-content'>
         {
            user ?<> <p>{user.email} </p> 
            <button onClick={logout} className='logoutbtn'>Logout</button>
            </>   : <button className='loginnav'><Link to={"/login"}>Login</Link></button>
         }
         <Link to={"/Cart"}><button className='cartbtn'>cart</button></Link>
         </div>
        </div>
    )
}

export default Navbar;