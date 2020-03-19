import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Registro de Mascotas</h1>
          <p className='lead'>
            Crea un perfil para tu mascota y registralo con el ID de su
            Microchip
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Registrar
            </Link>
            <Link to='/login' className='btn btn-light'>
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
