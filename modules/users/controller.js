import uuid from 'uuid/v4'


const notFound = (req, res) => {
    res
        .status(404)
        .json({
            message: 'User Not Found',
            status: 404,
        })
}

const userCollection = {}

const userController = {
	GET (req, res) {
		const { uid } = req.params
		if (!uid) {
			res.json (userCollection)
			return
		}

		if (!userCollection[uid]) {
			notFound (req, res)
			return
        }

        res
            .status (200)
            .json (userCollection[uid])
	},

	POST (req, res) {
		const uid = uuid ()
		userCollection[uid] = {
			...req.body,
			uid,
			created_at: (new Date ()).toISOString (),
        }

        res
            .status (201)
            .json (userCollection[uid])
	},

	PUT (req, res) {
		const { uid } = req.params
		if (!userCollection[uid]) {
			notFound (req, res)
			return
		}

		const { created_at } = userCollection[uid]

		userCollection[uid] = {
			...req.body,
			uid,
			created_at,
			updated_at: (new Date ()).toISOString (),
        }

        res
            .status (200)
            .json (userCollection[uid])
	},

	PATCH (req, res) {
		const { uid } = req.params
		if (!userCollection[uid]) {
			notFound (req, res)
			return
		}

		const protectedKeys = ['uid', 'created_at', 'updated_at']
		const properties = Object.keys (req.body)

		if (properties.some (key => protectedKeys.includes (key))) {
            res
                .status (400)
                .json ({
                    protectedKeys,
                    message: `You can' modify protected keys`,
                    status: 400,
                })
			return
		}

        let invalidKeys = []
		properties.forEach (key => {
			if (!userCollection[uid][key]) {
                invalidKeys.push(key)
            } else {
                userCollection[uid][key] = req.body[key]
            }
        })

        if (invalidKeys.length) {
            res
                .status (400)
                .json ({
                    invalidKeys,
                    message: `One or more keys is not a valid User property`,
                    status: 400,
                })
            return
        }

		userCollection[uid].updated_at = (new Date ()).toISOString ()

        res
            .status (200)
            .json (userCollection[uid])
	},

	DELETE (req, res) {
		const { uid } = req.params
		if (!userCollection[uid]) {
			notFound (req, res)
			return
		}

        delete userCollection[uid]

        res.status (204).end ()
	},
};

export default userController;