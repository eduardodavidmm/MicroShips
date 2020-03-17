const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route   POST api/users
//@desc    Register Chip
//@access  Public

router.post(
  '/',
  [
    check('name', 'Nombre es Requerido')
      .not()
      .isEmpty(),
    check('idnumber', 'Por favor registra un id valido')
      .isNumeric()
      .isLength({ min: 11, max: 11 }),
    check(
      'password',
      'Por favor ingresa una contraseña con más de 6 caracteres'
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, idnumber, password } = req.body;

    try {
      let user = await User.findOne({ idnumber });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'El id ya existe' }] });
      }

      const avatar = gravatar.url(idnumber, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        idnumber,
        password,
        avatar
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
