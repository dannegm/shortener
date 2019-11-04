import swagger from 'swagger-ui-express'

import settings from '@/config/settings'
import buildModules from '@/modules'
import swaggerDocument from '@/assets/swagger.json'

export default function (app) {
    const swaggerOptions = {
        explorer: true
    }
    app.use('/documentation', swagger.serve, swagger.setup (swaggerDocument, swaggerOptions))
    app.route('/').all((req, res) => res.redirect(301, '/documentation'))
    buildModules (app)

    const schema = `http://${settings.server.hostname}:${settings.server.port}`
    app.logger.info (`Listening on ${schema.yellow}`)
    app.listen (settings.server.port)
}