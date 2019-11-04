import 'dotenv/config'
import { generateParams } from '@/utils/helpers'

let server = {
  hostname: process.env.HOSTNAME || 'localhost',
  port: process.env.now ? 8080 : (process.env.PORT || 3000),
  secret: process.env.SECRET,
}

let mongo = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE,
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
    query: {
        retryWrites: true,
        w: 'majority',
    },
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

const mongoAuth = mongo.user != '' && mongo.password != '' ? `${mongo.user}:${mongo.password}@` : ''
const mongoShemaDev = `mongodb://${mongoAuth}${mongo.host}:${mongo.port}/${mongo.database}?${generateParams(mongo.query)}`
const mongoSchemaProd = `mongodb+srv://${mongoAuth}${mongo.host}/${mongo.database}?${generateParams(mongo.query)}`
mongo.schema = process.env.NODE_ENV === 'development' ? mongoShemaDev : mongoSchemaProd

const crypt = {
    salt: 10,
    secret: process.env.SECRET,
}

export default {
  server,
  mongo,
  crypt,
}
