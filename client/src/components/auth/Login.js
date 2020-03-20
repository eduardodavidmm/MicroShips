import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    idnumber: '',
    password: ''
  });

  const { idnumber, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Ingresando...');
  };

  return (
    <Fragment>
      <h1 className='large text-primary text-center my-3'>Ingreso</h1>
      <p className='lead text-center'>
        Ingresa al perfil de tu Mascota <i className='fas fa-paw'></i>
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='ID de Microchip'
            name='idnumber'
            maxLength='11'
            value={idnumber}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Contraseña'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <center>
          <input type='submit' className=' btn btn-primary' value='Ingresar' />
        </center>
      </form>
      <p className='my-3'>
        ¿Tu mascota no está registrada?{' '}
        <Link to='/register'>Registra aquí</Link> Para crear su perfil
      </p>
    </Fragment>
  );
};

export default Login;
