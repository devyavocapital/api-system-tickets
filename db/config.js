const url = process.env.YAVO_SYSTEM_URL_MONGODB_URL
const user = process.env.YAVO_SYSTEM_URL_MONGODB_USER
const pass = process.env.YAVO_SYSTEM_URL_MONGODB_PASSWORD
const cluster = process.env.YAVO_SYSTEM_URL_MONGODB_CLUSTER
const endString = process.env.YAVO_SYSTEM_URL_MONGODB_END
const databaseName = process.env.YAVO_SYSTEM_URL_MONGODB_DATABASE

export const urlApi = `${url}${user}:${pass}@${cluster}.${endString}/${databaseName}`
