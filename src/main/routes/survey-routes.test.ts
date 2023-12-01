import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

let surveyCollection: Collection
let accountCollection: Collection
const makeAccesToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Jean',
    email: 'jean.aug@outlook.com.br',
    password: '123',
    role: 'admin',
  })

  const id = res.insertedId
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne(
    { _id: id },
    {
      $set: { accessToken },
    },
  )
  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as any)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany()

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without access token', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer 2',
              image: 'http://image-name.com',
            },
          ],
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid access token', async () => {
      const accessToken = await makeAccesToken()

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(204)
    })
  })
  describe('GET /survey Routes', () => {
    test('Should return 403 on load surveys without access token', async () => {
      await request(app).get('/api/surveys').expect(403)
    })

    test('Should return 204 on load surveys with valid access token', async () => {
      const accessToken = await makeAccesToken()
      await request(app).get('/api/surveys').set('x-access-token', accessToken).expect(204)
    })
  })
})
