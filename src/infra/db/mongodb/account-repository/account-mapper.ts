import { AccountModel } from '../../../../domain/models/account'

export const map = (id: string, account: any): AccountModel => {
  return { id, ...account }
}
