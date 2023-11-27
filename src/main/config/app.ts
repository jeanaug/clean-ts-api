import setupMidddlewares from './middlewares'
import setupRoutes from './routes'
import express from 'express'

const app = express()
setupMidddlewares(app)
setupRoutes(app)
export default app
