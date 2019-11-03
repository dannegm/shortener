import settings from '@/config/settings'
import buildModules from '@/modules'

export default function (app) {
    app.all ('/', (req, res) => {
        res.json ({
            method: req.method,
            message: 'Few steps to greatness.',
            body: req.body,
        })
    })

    buildModules (app)
    const schema = `http://${settings.server.hostname}:${settings.server.port}`
    app.logger.info (`Listening on ${schema.yellow}`)
    app.listen (settings.server.port)
}