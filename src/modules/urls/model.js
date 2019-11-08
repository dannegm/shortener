import { Schema, model } from 'mongoose'

const UrlModel = model ('urls', new Schema ({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

    author: { type: Schema.Types.ObjectId, ref: 'users' },
    visits: [{ type: Schema.Types.ObjectId, ref: 'visits' }],
    visitsCount: {
        type: Number,
        default: 0,
    },

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
    ogTags: Schema.Types.Mixed,
}))

const VisitModel = model ('visits', new Schema ({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

    remoteIP: String,
    userAgent: String,
    referer: String,
}))

export {
    UrlModel,
    VisitModel,
}