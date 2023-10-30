import { LoadAccountByEmailRepository } from '../../../protocols/load-account-by-email-repository'
import { AccountModel } from '../db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async load(email: string): Promise<AccountModel> {
    const account = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    }
    return new Promise(resolve => resolve(account))
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email ', async () => {
    const loadAccountByEmailRepositoryStub =
      new LoadAccountByEmailRepositoryStub()

    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@email.com',
      password: 'any_passord',
    })

    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
