import express from 'express'
import setupMidddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
setupMidddlewares(app)
setupRoutes(app)
export default app
