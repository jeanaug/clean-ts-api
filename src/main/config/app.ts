import express from 'express'
import setupMidddlewares from './middlewares'

const app = express()
setupMidddlewares(app)
export default app
