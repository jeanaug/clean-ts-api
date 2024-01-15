import setupMidddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'
import setupStaticFiles from './static-files'
import express from 'express'
import { set } from 'mockdate'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMidddlewares(app)
setupRoutes(app)
export default app
