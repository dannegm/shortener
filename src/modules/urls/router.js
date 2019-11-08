import { auth, optionalAuth } from '@/utils/middlewares'
import urlsController from './controller'

export default function urlsRouter (app) {
    app
        .route ('/s/:short?')
        .all (urlsController.REDIRECT)
    app
        .route ('/qr/:short?\.:ext?')
        .all (urlsController.QRCODE)

    app
        .route ('/urls')
        .get (urlsController.GET)

    app
        .route ('/urls')
        .all (optionalAuth)
        .post (urlsController.POST)

    app
        .route ('/urls/:hash?')
        .get (urlsController.GET)

    app
        .route ('/users/:_id/urls')
        .get (urlsController.GET_BY_USER)

    app
        .route ('/me/urls')
        .all (auth)
        .get (urlsController.GET_BY_USER)
}