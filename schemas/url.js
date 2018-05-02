'use strict';

const { Schema, model } = require ('mongoose');
const collection = 'urls';

const body = {
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  user: { type: Schema.Types.ObjectId, ref: 'user' },
  visits: [{ type: Schema.Types.ObjectId, ref: 'visit' }],

  url: {
    type: String,
    required: true,
  }
  short: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true,
    unique: true
  },

  protocol: String,
  domain: String,
  path: String,
  og: Mixed,
};
module.exports = model ('url', new Schema (body, { collection });