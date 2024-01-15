import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  app.use('/static', router)
}
