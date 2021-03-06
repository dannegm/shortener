import responses from '@/utils/responses'
import { verifyJWT } from '@/utils/security'
import UserModel from '@/modules/users/model'

const handleErrors = (req, res, handler) => {
    try {
        handler ()
    } catch (error) {
        responses.INTERNAL_ERROR (res, { error })
    }
}

const logger = (req, res, next) => {
    const methods = {
        'GET': req.method.blue.bold,
        'POST': req.method.green.bold,
        'PUT': req.method.yellow.bold,
        'DELETE': req.method.red.bold,
        'PATCH': req.method.cyan.bold,
    }
    req.app.logger.info (`${' HTTP '.black.bold.bgWhite} ${methods [req.method]} ${req.path}`)
    // app.logger.json ('HEADERS', req.headers);
    req.app.logger.json ('BODY', req.body);
    next ()
}

const auth = async (req, res, next) => {
    try {
        const [ header, token ] = req.headers.authorization.split(' ')
        const { _id } = await verifyJWT (token)
        const [ user ] = await UserModel.find({ _id })

		if (!user) {
            responses.NOT_FOUND (res, {
                message: 'User not found',
            })
            return
        }

        req.user = user
        next ()
    } catch (error) {
        responses.UNAUTHORIZED (res, {
            message: 'Invalid token',
        })
        return
    }
}

const optionalAuth = async (req, res, next) => {
    try {
        const [ header, token ] = req.headers.authorization.split(' ')
        const { _id } = await verifyJWT (token)
        const [ user ] = await UserModel.find({ _id })

		if (!!user) {
            req.user = user
        }

        next ()
    } catch (error) {
        next ()
    }
}

export {
    handleErrors,
    logger,
    auth,
    optionalAuth,
}