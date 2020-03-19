import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    idnumber: '',
    password: '',
    password2: ''
  });

  const { name, idnumber, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Las contraseñas no coinciden');
    } else {
      console.log('Registrado');
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary text-center my-3'>Registro</h1>
      <p className='lead text-center'>
        {' '}
        Registra a tu Mascota <i className='fas fa-paw'></i>
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nombre'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirmar Contraseña'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <center>
          <input type='submit' className=' btn btn-primary' value='Registrar' />
        </center>
      </form>
      <p className='my-3'>
        ¿Tu mascota ya está registrada? <Link to='/login'>Ingresa</Link> Para
        ver su perfil
      </p>
    </Fragment>
  );
};

export default Register;
