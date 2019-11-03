const responses = {
    OK (res, content) {
        res.status(200).json({
            status: 200,
            data: content,
        })
    },
    CREATED (res, content) {
        res.status(201).json({
            status: 201,
            data: content,
        })
    },
    NOT_CONTENT (res) {
        res.status(204).end()
    },

    REDIRECT (res, redirection) {
        res.status(301).redirect(redirection)
    },

    BAD_REQUEST (res, description = {}) {
        res.status(400).json({
            status: 400,
            error: 'Bad Request',
            description,
        })
    },
    NOT_FOUND (res, description = {}) {
        res.status(400).json({
            status: 404,
            error: 'Not Found',
            description,
        })
    },

    INTERNAL_ERROR (res, description = {}) {
        res.status(400).json({
            status: 500,
            error: 'Internal Server Error',
            description,
        })
    },
}
export default responses