const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  eatery: {
    type: Schema.Types.ObjectId,
    ref: 'eatery'
  },
  items: [
    {
      item: {
        type: String
      },
      price: {
        type: String
      }
    }
  ]
});

module.exports = Cart = mongoose.model('cart', CartSchema);
