const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
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
  ],
  tax: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);
