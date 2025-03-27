import { ApplicationError } from '@/protocols';
import { ApplicationInvalidateDataError } from '@/protocols';

export function invalidDataError(details: string[]): ApplicationInvalidateDataError {
  return {
    name: 'InvalidDataError',
    message: 'Invalid data',
    details,
  };
}

