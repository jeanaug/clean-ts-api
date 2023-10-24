import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    console.log('PASSOU', value)
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
