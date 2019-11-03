import { INTERNAL_ERROR } from './responses'
const handleErrors = (req, res, handler) => {
    try {
        handler ()
    } catch (error) {
        INTERNAL_ERROR (res, { error })
    }
}

export {
    handleErrors
}