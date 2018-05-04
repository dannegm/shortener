'use strict';
require ('colors');

const settings = require (`./config/settings`);
const
  express = require ('express'),
  mongoose = require ('mongoose'),
  winston = require ('winston'),
  session = require('express-session'),
  bodyParser = require ('body-parser'),
  favicon = require('serve-favicon');

//! Setup & expose
const app = module.exports = express ();
const MongoStore = require ('connect-mongo') (session);

app.locals.hostname = settings.server.hostname;
mongoose.connect (settings.mongo.schema);

app
  .use (favicon ('./favicon.ico'))
  .use (bodyParser.json ())
  .use (bodyParser.urlencoded ({ extended: false }))
  .use (session ({
    store: new MongoStore ({
      mongooseConnection: mongoose.connection,
    }),
    secret: settings.server.secret,
    resave: true,
    saveUninitialized: true
  }));

//! Logger
app.logger = new winston.Logger ({

});
app.logger.configure ({
  transports: [
    new (winston.transports.Console) ({
      name: 'Console',
      timestamp: (new Date ()).toISOString (),
      colorize: true,
    }),
    new (winston.transports.File) ({
      name: 'File',
      filename: `${process.env.npm_package_name}.log`,
      timestamp: (new Date ()).toISOString (),
      json: false,
      formatter: (options) => {
        const message = options.message.replace (/(\u001B)|(\\u[0-9a-f]{0,4})|(\[[0-9a-z]{1,3})/gi, '');
        return `${options.timestamp} - [${options.level.toUpperCase ()}] ${message}`;
      },
    }),
  ],
});

//! Routes
app.all ('*', (req, res, next) => {
  app.logger.info (`${req.method.blue.bold} ${req.path}`);
  next ();
});
app.all ('/', (req, res) => {
  res.json ({
    method: req.method,
    message: 'Few steps to greatness.',
    body: req.body,
  });
});

//! Server
const deploy = () => {
  const schema = `http://${settings.server.hostname}:${settings.server.port}`;
  app.listen (settings.server.port);
  app.logger.info (`Listening on ${schema.yellow}`);
};

//! Expose port
if (!module.parent) {
  deploy ();
}