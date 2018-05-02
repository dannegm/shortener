'use strict';

module.exports = {
  url: {
    presence: { allowEmpty: false },
    url: {
      schemes: [ 'http', 'https' ],
      allowLocal: false
    }
  },
};