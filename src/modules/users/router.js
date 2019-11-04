import { auth } from '@/utils/middlewares'
import userController from './controller';

export default function userRouter (app) {
    app
        .route ('/me')
        .all (auth)
        .get (userController.ME)

    app
        .route ('/users')
        .get (userController.GET)
        .post (userController.POST)

    app
        .route ('/users/:id?')
        .get (userController.GET)
        // .put(userController.PUT)
        // .patch(userController.PATCH)
        // .delete(userController.DELETE)
}