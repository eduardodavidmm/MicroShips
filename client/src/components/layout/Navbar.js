import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-white'>
      <h1>
        <Link to='/'>
          <i className='fas fa-dog'></i> Registro de Mascotas
        </Link>
      </h1>
      <ul>
        <li>
          <a href='profiles.html'>Mascotas</a>
        </li>
        <li>
          <Link to='/register'>Registrar</Link>
        </li>
        <li>
          <Link to='login'>Ingresar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
