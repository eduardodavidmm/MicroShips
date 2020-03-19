import React from 'react';

const Footer = () => {
  return (
    <footer className='site-footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <h6>Acerca de Nosotros</h6>
            <p className='text-justify'>
              Industia Veterinaria, Registro de Mascotas.
            </p>
          </div>
        </div>
        <hr />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-sm-6 col-xs-12'>
            <p className='copyright-text'>
              Industria Veterinaria S. de R.L. de C.V. &copy; 2020 Todos los
              derechos reservados
              <a
                href='https://www.induvet.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                INDUVET
              </a>
              .
            </p>
          </div>

          <div className='col-md-4 col-sm-6 col-xs-12'>
            <ul className='social-icons'>
              <li>
                <a
                  href='https://www.induvet.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='facebook'
                >
                  <i className='fab fa-facebook'></i>
                </a>
              </li>
              <li>
                <a
                  href='https://www.induvet.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='twitter'
                >
                  <i className='fab fa-twitter'></i>
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/induvethn'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='instagram'
                >
                  <i className='fab fa-instagram'></i>
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/induvethn'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='linkedin'
                >
                  <i className='fab fa-linkedin'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
