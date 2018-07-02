const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const eateries = require('./routes/api/eateries');
const cart = require('./routes/api/cart');
const orders = require('./routes/api/orders');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport.js')(passport);

app.use('/api/users', users);
app.use('/api/eateries', eateries);
app.use('/api/cart', cart);
app.use('/api/orders', orders);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
