const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EaterySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  address: {
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    }
  },
  hours: {
    sundayO: {
      type: String
    },
    sundayC: {
      type: String
    },
    mondayO: {
      type: String
    },
    mondayC: {
      type: String
    },
    tuesdayO: {
      type: String
    },
    tuesdayC: {
      type: String
    },
    wednesdayO: {
      type: String
    },
    wednesdayC: {
      type: String
    },
    thuesdayO: {
      type: String
    },
    thuesdayC: {
      type: String
    },
    fridayO: {
      type: String
    },
    fridayC: {
      type: String
    },
    saturdayO: {
      type: String
    },
    saturdayC: {
      type: String
    }
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  website: {
    type: String
  },
  menu: [
    {
      item: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: String
      }
    }
  ],
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      avatar: {
        type: String
      },
      rating: {
        type: String
      },
      comment: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Eatery = mongoose.model('eateries', EaterySchema);
