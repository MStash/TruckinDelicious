const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// route   GET api/orders/test
// desc    Tests orders route
// access  Public
router.get('/test', (req, res) => res.json({ msg: 'Orders Works' }));

module.exports = router;
