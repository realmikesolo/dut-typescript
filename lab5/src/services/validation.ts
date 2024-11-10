import { ValidationResult } from '../utilities/validators';

export type Validator<T> = {
  validate: (data: T) => ValidationResult;
};
