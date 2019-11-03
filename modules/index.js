const modules = [
    'users',
]

export default function buildModules (app) {
    modules.forEach(async module => {
        const router = await import(`./${module}/routes`)
        router.default (app)
    })
}