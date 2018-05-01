'use strict';
require ('dotenv').config ();

const
  hostname = process.env.HOSTNAME,
  port = process.env.PORT || 300,
  secret = process.env.SECRET;

let mongo = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_DATABASE,
  user: process.env.MONGO_USER || '',
  password: process.env.MONGO_PASSWORD || '',
};
mongo.auth = mongo.user != '' && mongo.password != '' ? `${mongo.user}:${mongo.password}@` : '';

module.exports = {
  server: {
    hostname,
    port,
    secret,
  },
  mongo: {
    schema: `mongodb://${mongo.auth}${mongo.host}:${mongo.port}/${mongo.database}`,
    host: mongo.host,
    port: mongo.port,
    database: mongo.database,
    user: mongo.user,
    password: mongo.password,
  }
};