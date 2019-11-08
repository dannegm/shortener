import uuid from 'uuid/v5'
import QRCode from 'qrcode'
import { parse } from 'url'
import opengraph from 'open-graph-scraper'

import settings from '@/config/settings'
import responses from '@/utils/responses'
import UserModel from '@/modules/users/model'
import { UrlModel, VisitModel } from './model'

const urlsController = {
	async GET (req, res) {
        const { hash } = req.params
        if (!hash) {
            const registers = await UrlModel.find({}).populate('author', '_id name email')
            responses.OK (res, registers)
            return
        }

        const [ model ] = await UrlModel.find({ hash })
            .populate('author', '_id name email')
            .populate('visits', '-_id -__v')

        if (!model) {
            responses.NOT_FOUND (res, {
                hash,
                message: 'URL with providen hash not found',
            })
            return
        }

        responses.OK (res, model)
        return
    },

	async GET_BY_USER (req, res) {
        let _id;

        if (!req.user) {
            _id = req.params._id
            const [ user ] = await UserModel.find({ _id })

            if (!user) {
                responses.UNAUTHORIZED(res, {
                    message: 'User Not Found'
                })
                return
            }
        } else {
            _id = req.user._id
        }

        const models = await UrlModel.find({ author: _id }).populate('author', '_id name email')
        responses.OK (res, models)
        return
	},

	async POST (req, res) {
        const { url } = req.body
        const hash = uuid (url, uuid.URL)

        const [ registered ] = await UrlModel.find ({ hash })
        if (!!registered) {
            responses.OK (res, registered)
            return
        }

        const { protocol, hostname, pathname } = parse (url)
        let urlData = {
            url,
            hash,
            protocol,
            domain: hostname,
            path: pathname,
            short: hash.split('-')[0],
        }

        if (!!req.user) {
            urlData.author = req.user
        }

        try {
            const ogData = await opengraph({ url })
            urlData.ogTags = ogData.data
        } catch (e) {
            console.warn(e)
        }

        req.app.logger.json('MODEL', urlData)

        const model = new UrlModel(urlData)
        model.save()
        responses.CREATED (res, model)
        return
    },

    async REDIRECT (req, res) {
        const { short } = req.params
        if (!short) {
            responses.BAD_REQUEST (res, {
                message: 'Please, provide a short code',
            })
            return
        }

        const [ model ] = await UrlModel.find({ short })
        if (!model) {
            responses.NOT_FOUND (res, {
                short,
                message: 'URL with providen short code not found',
            })
            return
        }

        const visitData = {
            remoteIP: req.headers ['x-forwarded-for'],
            userAgent: req.headers ['user-agent'],
            referer: req.headers ['referer'],
        }
        const visit = new VisitModel (visitData)
        visit.save()

        model.visits.push(visit)
        model.visitsCount += 1
        model.save()

        responses.REDIRECT (res, model.url)
    },

    async QRCODE (req, res) {
        const { short, ext = 'png' } = req.params
        const { hostname, port } = settings.server

        const hasPort = port !== '80'
        const portSchema = hasPort ? `:${port}` : ''
        const uri = `http://${hostname}${portSchema}/s/${short}`

        const qrcode = await QRCode.toDataURL(uri, {
            type: `image/${ext}`
        })
        responses.IMAGE(res, qrcode)
    }
};

export default urlsController