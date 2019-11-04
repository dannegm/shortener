import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function hashPassword (password) {
    try {
        const { crypt } = (await import('@/config/settings')).default
        return await bcrypt.hash (password, crypt.salt)
    } catch (error) {
        throw error
    }
}

async function comparePassword (password, hash) {
    try {
        return await bcrypt.compare (password, hash)
    } catch (error) {
        throw error
    }
}

async function generateJWT (payload, expiresIn) {
    try {
        const { crypt } = (await import('@/config/settings')).default
        return jwt.sign (payload, crypt.secret, { expiresIn })
    } catch (error) {
        throw error
    }
}

async function verifyJWT (token) {
    try {
        const { crypt } = (await import('@/config/settings')).default
        return jwt.verify(token, crypt.secret)
    } catch (error) {
        throw error
    }
}

export {
    hashPassword,
    comparePassword,
    generateJWT,
    verifyJWT,
}