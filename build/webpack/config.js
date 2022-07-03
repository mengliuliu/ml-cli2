const path = require('path')

//定义目录
const PROJECT_SRCPATH = path.resolve(process.cwd(), './src')
const PROJECT_DISTPATH = path.resolve(process.cwd(), './dist')
const PROJECT_PUBLICPATH = path.resolve(process.cwd(), './public')
const pathConfig = {
    PROJECT_SRCPATH,
    PROJECT_DISTPATH,
    PROJECT_PUBLICPATH,
}

const serverConfig = {
    SERVER_HOST: '0.0.0.0',
    SERVER_PORT: 8009,
}

module.exports = { pathConfig, serverConfig }
