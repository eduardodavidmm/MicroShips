const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route   GET api/Profile/me
//@desc    Get current users profile
//@access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'No hay perfil de este usuario' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   POST api/profile
//@desc    Create or update user profile
//@access  Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      breed,
      owner,
      location,
      status,
      bio,
      phone,
      email,
      facebook,
      instagram,
      twitter
    } = req.body;

    // Build profile object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (breed) profileFields.breed = breed;
    if (owner) profileFields.owner = owner;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;

    //Build Contact Array
    profileFields.contact = {};
    if (phone) profileFields.contact.phone = phone;
    if (email) profileFields.contact.email = email;
    if (facebook) profileFields.contact.facebook = facebook;
    if (instagram) profileFields.contact.instagram = instagram;
    if (twitter) profileFields.contact.twitter = twitter;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // Actualizar

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Crear
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route   GET api/profile
//@desc    Get all profiles
//@access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   GET api/profile/user/:user_id
//@desc    Get profile by user ID
//@access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Perfil no encontrado' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Perfil no encontrado' });
    }
    res.status(500).send('Server Error');
  }
});

//@route   DELETE api/profile
//@desc    Delete Profile, user and post
//@access  Private

router.delete('/', auth, async (req, res) => {
  try {
    //Borrar Actualizaciones

    //Borrar Perfil
    await Profile.findOneAndRemove({ user: req.user.id });
    //Borrar Usuario
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'Usuario Borrado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   PUT api/profile/information
//@desc    Add profile information
//@access  Private

router.put(
  '/information',
  [
    auth,
    [
      check('current', 'Es requerido saber si se encuentra en casa')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { age, location, current } = req.body;

    const newInfo = {
      age,
      location,
      current
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.information.unshift(newInfo);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
