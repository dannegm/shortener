import { Schema, model } from 'mongoose'

const collection = 'urls'
const schema = {
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

    // user: { type: Schema.Types.ObjectId, ref: 'user' },
    // visits: [{ type: Schema.Types.ObjectId, ref: 'visit' }],

    url: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true,
        unique: true,
    },

    protocol: String,
    domain: String,
    path: String,
}

const UrlModel = model (collection, new Schema (schema))
export default UrlModel