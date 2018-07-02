const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.address1 = !isEmpty(data.address1) ? data.address1 : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.zip = !isEmpty(data.zip) ? data.zip : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.address1)) {
    errors.address1 = 'Street field is required';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'City field is required';
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = 'State field is required';
  }

  if (Validator.isEmpty(data.zip)) {
    errors.zip = 'Zip Code field is required';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone Number is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
