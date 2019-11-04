import responses from '@/utils/responses'
import { comparePassword, generateJWT } from '@/utils/security'
import UserModel from '@/modules/users/model'

const loginController = {
	async LOGIN (req, res) {
        const { email, password } = req.body

        const [ user ] = await UserModel.find({ email })
		if (!user) {
            responses.NOT_FOUND (res, {
                message: 'User not found',
            })
            return
        }

        const match = await comparePassword (password, user.password)
        if (!match) {
            responses.BAD_REQUEST (res, {
                message: 'Invalid password',
            })
            return
        }

        const tokenTTL = `${1000 * 60 * 60 * 1}ms`
        const tokenPayload = {
            _id: user._id,
        }
        const token = await generateJWT (tokenPayload, tokenTTL)

        responses.OK (res, { token })
        return
	},
};

export default loginController;