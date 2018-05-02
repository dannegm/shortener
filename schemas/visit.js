'use strict';

const { Schema, model } = require ('mongoose');
const collection = 'visits';

const body = {
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  user: { type: Schema.Types.ObjectId, ref: 'user' },

  remoteIP: String,
  userAgent: String,
  referer: String,
};
module.exports = model ('visit', new Schema (body, { collection });