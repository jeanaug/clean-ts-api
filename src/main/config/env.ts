export default {
//  mongoUrl: process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/clean-node-api',
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? '$Tih1982==@t',
  sourceMap: process.env.GENERATE_SOURCEMAP ?? false
}
