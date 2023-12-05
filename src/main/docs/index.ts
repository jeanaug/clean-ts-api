import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account-schemas'
import { loginParamsSchema } from './schemas/login-params-schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'API do curso para realizar enquetes para programadores',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
  ],
  paths: {
    '/login': loginPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
  },
}
