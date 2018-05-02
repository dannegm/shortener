'use strict';

module.exports = {
  name: {
    presence: { allowEmpty: false },
  },
  email: {
    presence: { allowEmpty: false },
    email: true
  },
};