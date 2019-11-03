import uuid from 'uuid/v5'
import { parse } from 'url'

import responses from '@/utils/responses'
import UrlModel from './model'

const urlsController = {
	async GET (req, res) {
        const { hash } = req.params
        if (!hash) {
            const registers = await UrlModel.find({})
            responses.OK (res, registers)
            return
        }

        const model = await UrlModel.find({ hash })
        if (!model || !model.length) {
            responses.NOT_FOUND (res, {
                hash,
                message: 'URL with providen hash not found',
            })
            return
        }

        responses.OK (res, model[0])
        return
	},

	async POST (req, res) {
        const { url } = req.body
        const hash = uuid (url, uuid.URL)

        const registers = await UrlModel.find({ hash })
        if (registers.length) {
            responses.OK (res, registers[0])
            return
        }

        const { protocol, hostname, pathname } = parse (url)
        const urlData = {
            url,
            hash,
            protocol,
            domain: hostname,
            path: pathname,
            short: hash.split('-')[0],
        }

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

        const model = await UrlModel.find({ short })
        if (!model || !model.length) {
            responses.NOT_FOUND (res, {
                short,
                message: 'URL with providen short code not found',
            })
            return
        }

        responses.REDIRECT (res, model[0].url)
        return
    }
};

export default urlsController;