import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import MockDate from 'mockdate'
import { Collection } from 'mongodb'
let surveyCollection: Collection
describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL as any)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })
  const makesut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  describe('Add()', () => {
    test('Should add a survey on success ', async () => {
      const sut = makesut()
      await sut.add({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
          {
            answer: 'other_answer',
          },
        ],
        date: new Date(),
      })

      const survey = await surveyCollection.findOne({ question: 'any_question' })

      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success ', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer',
            },
          ],
          date: new Date(),
        },
        {
          question: 'other_question',
          answers: [
            {
              image: 'other_image',
              answer: 'other_answer',
            },
          ],
          date: new Date(),
        },
      ])
      const sut = makesut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    test('Should load empty list ', async () => {
      const sut = makesut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
  describe('loadSurveyById()', () => {
    test('Should load survey by id on success ', async () => {
      const result = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
        ],
        date: new Date(),
      })

      const sut = makesut()
      const survey = await sut.loadById(result.insertedId.toString())
      expect(survey.id).toEqual(result.insertedId)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
  test('Should retuns null if id not existis', async () => {
    const sut = makesut()
    const fakeId = '1'.repeat(24)
    const survey = await sut.loadById(fakeId)
    expect(survey).toBeNull()
  })
})
