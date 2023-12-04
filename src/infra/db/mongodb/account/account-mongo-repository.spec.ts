import { AccountMongoRepository } from './account-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { mockAddAccountParams } from '@/domain/test'

let accountCollection: Collection
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as any)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })
  const makesut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Should retunr an account on add success ', async () => {
      const sut = makesut()
      const account = await sut.add(mockAddAccountParams())

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should retunr an account on loadByEmail success ', async () => {
      const sut = makesut()
      await accountCollection.insertOne(mockAddAccountParams())
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should retunr null if loadByEmail fails ', async () => {
      const sut = makesut()
      const account = await sut.loadByEmail('any_email@email.com')
      expect(account).toBeNull()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makesut()
      const fakeAccount = {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
      }
      await accountCollection.insertOne(fakeAccount)
      expect(fakeAccount['accessToken']).toBeFalsy()
      await sut.updateAccessToken(fakeAccount['_id'], 'any_token')
      const account = await accountCollection.findOne({ _id: fakeAccount['_id'] })
      expect(account).toBeTruthy()
      expect(account['accessToken']).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    test('Should retunr an account on loadByToken without role ', async () => {
      const sut = makesut()
      await accountCollection.insertOne(Object.assign({}, mockAddAccountParams(), { accessToken: 'any_token' }))
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return an account on loadByToken with admin role ', async () => {
      const sut = makesut()
      await accountCollection.insertOne(
        await accountCollection.insertOne(
          Object.assign({}, mockAddAccountParams(), {
            accessToken: 'any_token',
            role: 'admin',
          }),
        ),
      )
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
    test('Should return an account on loadByToken if user is admin ', async () => {
      const sut = makesut()
      await accountCollection.insertOne(
        Object.assign({}, mockAddAccountParams(), {
          accessToken: 'any_token',
          role: 'admin',
        }),
      )
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null on loadByToken with invalid role ', async () => {
      const sut = makesut()
      await accountCollection.insertOne(
        Object.assign({}, mockAddAccountParams(), {
          accessToken: 'any_token',
        }),
      )
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy
    })

    test('Should retunr null if loadByToken fails ', async () => {
      const sut = makesut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeNull()
    })
  })
})
