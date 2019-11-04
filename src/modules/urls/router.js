import urlsController from './controller';
export default function urlsRouter (app) {
    app
        .route ('/s/:short?')
        .all (urlsController.REDIRECT)

    app
        .route ('/urls')
        .get (urlsController.GET)
        .post (urlsController.POST)

    app
        .route ('/urls/:hash?')
        .get (urlsController.GET)
}