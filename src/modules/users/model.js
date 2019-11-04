import { Schema, model } from 'mongoose'

const collection = 'users'
const schema = {
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}

const UserModel = model (collection, new Schema (schema))
export default UserModel
