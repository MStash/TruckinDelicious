const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// route   GET api/cart/test
// desc    Tests cart route
// access  Public
router.get('/test', (req, res) => res.json({ msg: 'Cart Works' }));

module.exports = router;
