import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useDecryptToken } from "../App";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, isAdmin, nombre, logout } = useAuth();

  // useState(() => {
  //   setToken(localStorage.getItem('authToken'));
  //   const decript = useDecryptToken(token);
  //   let decoded;
  //   if(typeof decript === 'string' && decript !== 'null') {
  //     decoded = JSON.parse(atob(useDecryptToken(token)?.split('.')[1]));
  //   }
  //   if (decoded?.authorities?.includes('USER') || decoded?.authorities?.includes('ADMIN')) {
  //     console.log('User is logged in');
  //     setIsLoggedIn(true);
  //   }else{
  //     setIsLoggedIn(false);
  //   }

  //   if (decoded?.authorities?.includes('ADMIN')) {
  //     console.log('User is admin');
  //     setIsAdmin(true);
  //   }else{
  //     setIsAdmin(false);
  //   }
  // }, [isLoggedIn, token])

  return (
    <nav className='navbar'>
      <div className='container'>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <Link to="/" className='playfair-display'>SOL FUENTES {isAdmin && ' ~ ADMIN'}</Link>
          {isLoggedIn && nombre && (
            <span className="user-name-navbar" style={{fontWeight: 500, color: '#cca43b', fontSize: '1.1rem'}}>
              {nombre}
            </span>
          )}
        </div>
        
        <div className='nav'>
          
          {isLoggedIn && (
            <>
              <Link to="/MisCursos" className="mis-cursos-link">
                <section className='container mis-cursos-container'>
                  Mis Cursos
                  <i className="pi pi-book"></i>
                </section>
              </Link>
              <Link to="/Carrito">
                <i className="pi pi-shopping-cart"></i>
              </Link>
              <Link to="/login" onClick={logout}>
                <section className='container log-out'>
                  Cerrar Sesion
                  <i className="pi pi-sign-out"></i>
                </section>
              </Link>
            </>
          )}
       

          {!isLoggedIn && (
            <>
              <Link to="/login">Iniciar Sesión</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;