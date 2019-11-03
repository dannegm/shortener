import userController from './controller';
export default function userRouter (app) {
    app
        .get('/users/:uid?', userController.GET)
        .post('/users', userController.POST)
        .put('/users/:uid', userController.PUT)
        .patch('/users/:uid', userController.PATCH)
        .delete('/users/:uid', userController.DELETE)
}