import 'dotenv/config'

let server = {
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || 3000,
  secret: process.env.SECRET,
}

let mongo = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE,
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
    options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        reconnectTries: Number.MAX_VALUE,   // Never stop trying to reconnect
        reconnectInterval: 500,             // Reconnect every 500ms
        poolSize: 10,                       // Maintain up to 10 socket connections
        bufferMaxEntries: 0,                // If not connected, return errors immediately rather than waiting for reconnect
        keepAlive: 120,                     // Check TCP socket status every x milliseconds.
    },
}
mongo.auth = mongo.user != '' && mongo.password != '' ? `${mongo.user}:${mongo.password}@` : '';
mongo.schema = `mongodb://${mongo.auth}${mongo.host}:${mongo.port}/${mongo.database}`;

export default {
  server,
  mongo,
}