import responses from '@/utils/responses'
import { hashPassword } from '@/utils/security'

import UserModel from './model'

const userController = {
	async ME (req, res) {
        responses.OK (res, req.user)
        return
    },

	async GET (req, res) {
        const { id } = req.params

		if (!id) {
            const registers = await UserModel.find({})
            responses.OK (res, registers)
            return
        }

        const [ model ] = await UserModel.find({ _id: id })
		if (!model) {
            responses.NOT_FOUND (res, {
                id,
                message: 'User with providen ID not found',
            })
            return
        }

        responses.OK (res, model)
        return
	},

	async POST (req, res) {
        const { name, email, password } = req.body
        const [ registered ] = await UserModel.find ({ email })

        if (!!registered) {
            responses.OK (res, registered)
            return
        }

        const userData = {
            name,
            email,
            password: await hashPassword (password),
        }
        console.log(userData)

        const model = new UserModel(userData)
        model.save ()
        responses.CREATED (res, model)
        return
	},

	// PUT (req, res) {
	// 	const { uid } = req.params
	// 	if (!userCollection[uid]) {
	// 		notFound (req, res)
	// 		return
	// 	}

	// 	const { created_at } = userCollection[uid]

	// 	userCollection[uid] = {
	// 		...req.body,
	// 		uid,
	// 		created_at,
	// 		updated_at: (new Date ()).toISOString (),
    //     }

    //     res
    //         .status (200)
    //         .json (userCollection[uid])
	// },

	// PATCH (req, res) {
	// 	const { uid } = req.params
	// 	if (!userCollection[uid]) {
	// 		notFound (req, res)
	// 		return
	// 	}

	// 	const protectedKeys = ['uid', 'created_at', 'updated_at']
	// 	const properties = Object.keys (req.body)

	// 	if (properties.some (key => protectedKeys.includes (key))) {
    //         res
    //             .status (400)
    //             .json ({
    //                 protectedKeys,
    //                 message: `You can' modify protected keys`,
    //                 status: 400,
    //             })
	// 		return
	// 	}

    //     let invalidKeys = []
	// 	properties.forEach (key => {
	// 		if (!userCollection[uid][key]) {
    //             invalidKeys.push(key)
    //         } else {
    //             userCollection[uid][key] = req.body[key]
    //         }
    //     })

    //     if (invalidKeys.length) {
    //         res
    //             .status (400)
    //             .json ({
    //                 invalidKeys,
    //                 message: `One or more keys is not a valid User property`,
    //                 status: 400,
    //             })
    //         return
    //     }

	// 	userCollection[uid].updated_at = (new Date ()).toISOString ()

    //     res
    //         .status (200)
    //         .json (userCollection[uid])
	// },

	// DELETE (req, res) {
	// 	const { uid } = req.params
	// 	if (!userCollection[uid]) {
	// 		notFound (req, res)
	// 		return
	// 	}

    //     delete userCollection[uid]

    //     res.status (204).end ()
	// },
};

export default userController;