import paths from './paths'
import schemas from './schemas'
import components from './components'
import { addSurveyParamsSchema } from './schemas/add-survey-params-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'API do curso para realizar enquetes para programadores',
    version: '1.0.0',
  },
  license: {
    name: 'LGPL-3.0-or-later',
    url: 'https://www.gnu.org/licenses/lgpl-3.0.html',
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
    {
      name: 'Enquete',
    },
  ],
  paths,
  schemas,
  components,
}
