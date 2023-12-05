import setupMidddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'
import express from 'express'

const app = express()
setupSwagger(app)
setupMidddlewares(app)
setupRoutes(app)
export default app
