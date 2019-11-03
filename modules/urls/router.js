import urlsController from './controller';
export default function urlsRouter (app) {
    app
        .get('/s/:short?', urlsController.REDIRECT)

    app
        .get('/urls', urlsController.GET)
        .get('/urls/:hash?', urlsController.GET)
        .post('/urls', urlsController.POST)
}