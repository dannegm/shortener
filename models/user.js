'use strict';

const validate = require ('validate.js');
const { UserSchema } = require ('../schemas');

class UserModel {
  async constructor (user) {
    const _id = user._id;
    return this.user = await UserSchema.findOne ({ _id });
  }

  async create (data) {

  }

  validate (data) {

  }
}
module.exports = UserModel;