const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateEateryInput = require('../../validation/eatery');

const Eatery = require('../../models/Eatery');
const User = require('../../models/User');

// route   GET api/profile/test
// desc    Tests profile route
// access  Public
router.get('/test', (req, res) => res.json({ msg: 'Eateries Works' }));

// route   GET api/eateries
// desc    Get the current users eatery
// access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Eatery.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(eatery => {
        if (!eatery) {
          errors.noEatery = 'There is no eatery for this user';
          return res.status(404).json(errors);
        }
        res.json(eatery);
      })
      .catch(err => res.status(404).json(err));
  }
);

// route   GET api/eateries/all
// desc    Get all eateries
// access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Eatery.find()
    .then(eateries => {
      if (!eateries) {
        errors.noeateries = 'There are no eateries!';
        return res.status(404).json(errors);
      }

      res.json(eateries);
    })
    .catch(err => res.status(404).json({ eatery: 'There are no eateries!' }));
});

// route   GET api/eateries/name/:name
// desc    Get eatery by name
// access  Public
router.get('/eateries/:name', (req, res) => {
  const errors = {};

  Eatery.findOne({ name: req.params.name })
    .then(eatery => {
      if (!eatery) {
        errors.noeatery = 'There is no eatery with this name!';
        res.status(404).json(errors);
      }

      res.json(eatery);
    })
    .catch(err => res.status(404).json(err));
});

// route   GET api/eateries/eatery/:eatery_id
// desc    Get eatery by eatery ID
// access  Public
router.get('/eatery/:eatery_id', (req, res) => {
  const errors = {};

  Eatery.findOne({ eatery: req.params.eatery_id })
    .then(eatery => {
      if (!eatery) {
        errors.noeatery = 'There is no eatery for this id!';
        res.status(404).json(errors);
      }

      res.json(eatery);
    })
    .catch(err =>
      res.status(404).json({ eatery: 'There is no eatery for this id!' })
    );
});

// route   POST api/eateries
// desc    Create or edit eatery profile
// access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEateryInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const eateryFields = {};
    eateryFields.user = req.user.id;
    if (req.body.name) eateryFields.name = req.body.name;
    if (req.body.avatar) eateryFields.avatar = req.body.avatar;
    eateryFields.address = {};
    if (req.body.address1) eateryFields.address.address1 = req.body.address1;
    if (req.body.address2) eateryFields.address.address2 = req.body.address2;
    if (req.body.city) eateryFields.address.city = req.body.city;
    if (req.body.state) eateryFields.address.state = req.body.state;
    if (req.body.zip) eateryFields.address.zip = req.body.zip;
    eateryFields.hours = {};
    if (req.body.sundayO) eateryFields.hours.sundayO = req.body.sundayO;
    if (req.body.sundayC) eateryFields.hours.sundayC = req.body.sundayC;
    if (req.body.mondayO) eateryFields.hours.mondayO = req.body.mondayO;
    if (req.body.mondayC) eateryFields.hours.mondayC = req.body.mondayC;
    if (req.body.tuesdayO) eateryFields.hours.tuesdayO = req.body.tuesdayO;
    if (req.body.tuesdayC) eateryFields.hours.tuesdayC = req.body.tuesdayC;
    if (req.body.wednesdayO)
      eateryFields.hours.wednesdayO = req.body.wednesdayO;
    if (req.body.wednesdayC)
      eateryFields.hours.wednesdayC = req.body.wednesdayC;
    if (req.body.thuesdayO) eateryFields.hours.thuesdayO = req.body.thuesdayO;
    if (req.body.thuesdayC) eateryFields.hours.thuesdayC = req.body.thuesdayC;
    if (req.body.fridayO) eateryFields.hours.fridayO = req.body.fridayO;
    if (req.body.fridayC) eateryFields.hours.fridayC = req.body.fridayC;
    if (req.body.saturdayO) eateryFields.hours.saturdayO = req.body.saturdayO;
    if (req.body.saturdayC) eateryFields.hours.saturdayC = req.body.saturdayC;
    if (req.body.phone) eateryFields.phone = req.body.phone;
    if (req.body.email) eateryFields.email = req.body.email;
    if (req.body.website) eateryFields.website = req.body.website;

    Eatery.findOne({ eatery: req.body.id }).then(eatery => {
      if (eatery) {
        // Update
        Eatery.findOneAndUpdate(
          { eatery: req.body.id },
          { $set: eateryFields },
          { new: true }
        ).then(profile => res.json(eatery));
      } else {
        // Create

        // Check if handle exists
        Eatery.findOne({ name: eateryFields.name }).then(eatery => {
          if (eatery) {
            errors.name = 'That name already exists!';
            res.status(400).json(errors);
          }

          // Save Profile
          new Eatery(eateryFields).save().then(eatery => res.json(eatery));
        });
      }
    });
  }
);

// route   POST api/eateries/menu
// desc    Add menu item to eatery
// access  Private
router.post(
  '/menu',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Eatery.findOne({ eatery: req.body.id }).then(eatery => {
      const newItem = {
        item: req.body.item,
        description: req.body.description,
        price: req.body.price
      };

      eatery.menu.push(newItem);

      eatery.save().then(eatery => res.json(eatery));
    });
  }
);

// route   POST api/eateries/review/:id
// desc    Add review to eatery
// access  Private
router.post(
  '/review/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Eatery.findById(req.params.id)
      .then(eatery => {
        const newReview = {
          user: req.user.id,
          avatar: req.user.avatar,
          rating: req.body.rating,
          comment: req.body.comment
        };

        // Add to comments array
        eatery.reviews.push(newReview);

        // Save
        eatery.save().then(eatery => res.json(eatery));
      })
      .catch(err =>
        res.status(404).json({ eaterynotfound: 'No eatery found' })
      );
  }
);

// route   DELETE api/eateries
// desc    Delete user and eatery
// access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Eatery.findOneAndRemove({ eatery: req.body.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
