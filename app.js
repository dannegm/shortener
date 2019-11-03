import 'dotenv/config'
import 'colors'

import express from 'express';
import mongoose from 'mongoose'
import winston from 'winston'
import session from 'express-session'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import helmet from 'helmet'
import cors from 'cors'
import { highlight }  from 'cli-highlight'

import settings from './config/settings'
import modules from './modules'

const app = express ()

app.locals.hostname = settings.server.hostname
mongoose.connect (settings.mongo.schema, settings.mongo.options)

app
    .use (favicon ('./favicon.ico'))
    .use (helmet ())
    .use (cors ())
    .use (bodyParser.json ())
    .use (bodyParser.urlencoded ({ extended: false }))
    .use (
        session ({
            secret: settings.server.secret,
            resave: true,
            saveUninitialized: true,
        })
    )


const { log } = console
app.logger = new winston.Logger ()
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
})

app.outputs = {
    json (tag, code) {
        log (`[${tag}]`.magenta.bold)
        log (highlight (JSON.stringify (code, null, 2)))
    }
}

//* Log all request
app.use ((req, res, next) => {
    const methods = {
        'GET': req.method.blue.bold,
        'POST': req.method.green.bold,
        'PUT': req.method.yellow.bold,
        'DELETE': req.method.red.bold,
        'PATCH': req.method.cyan.bold,
    }
    app.logger.info (`${' HTTP '.black.bold.bgWhite} ${methods [req.method]} ${req.path}`)
    // app.outputs.json ('HEADERS', req.headers);
    // app.outputs.json ('BODY', req.body);
    next ()
});

app.all ('/', (req, res) => {
    res.json ({
        method: req.method,
        message: 'Few steps to greatness.',
        body: req.body,
    })
})

//* Server
const deploy = () => {
    const schema = `http://${settings.server.hostname}:${settings.server.port}`
    app.listen (settings.server.port)
    app.logger.info (`Listening on ${schema.yellow}`)
}

deploy ()