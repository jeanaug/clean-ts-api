import env from '@/main/config/env'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { SurveyModel } from '@/domain/models/survey'

let surveyResultCollection: Collection
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
describe('Survey Result Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as any)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany()

    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany()

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })
  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without access token', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403)
    })
    test('Should return 200 on save survey result with valid accessToken', async () => {
      const accessToken = await makeAccesToken()

      const surveyData = {
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
      }

      await surveyCollection.insertOne(surveyData)
      const survey: SurveyModel = MongoHelper.map(surveyData)

      await request(app)
        .put(`/api/surveys/${survey.id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1',
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without access token', async () => {
      await request(app).get('/api/surveys/any_id/results').expect(403)
    })

    test('Should return 200 on Load survey result with valid accessToken', async () => {
      const accessToken = await makeAccesToken()

      const surveyData = {
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
      }

      await surveyCollection.insertOne(surveyData)
      const survey: SurveyModel = MongoHelper.map(surveyData)

      await request(app).get(`/api/surveys/${survey.id}/results`).set('x-access-token', accessToken).expect(200)
    })
  })
})
