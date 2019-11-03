function generateParams (params) {
    return Object.keys(params)
        .map (key => {
            if (!params[key]) return false
            return `${key}=${params[key]}`
        })
        .filter(i => i)
        .join ('&')
}

export {
    generateParams,
}