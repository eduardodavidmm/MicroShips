import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
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
      setAlert('Las contraseñas no coinciden', 'danger');
    } else {
      register({ name, idnumber, password });
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default connect(null, { setAlert, register })(Register);
