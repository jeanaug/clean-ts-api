import { Validation } from './validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {
    this.validations = validations
  }

  validate(input: string): Error {
    this.validations.forEach(validation => {
      const error = validation.validate(input)
      if (error) {
        return new Error()
      }
    })
    return null as any
  }
}
