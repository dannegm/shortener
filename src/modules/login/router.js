import loginController from './controller';
export default function loginRouter (app) {
    app.route ('/login').post(loginController.LOGIN)
}