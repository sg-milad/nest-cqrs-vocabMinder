import { HttpException, HttpStatus } from '@nestjs/common';

export interface ICustomError {
  status: number;
  description: string;
  id?: string;
}

export class CustomError extends HttpException {
  constructor({ description, status }: ICustomError) {
    super(description, status);
  }
}
export const INTERNAL_SERVER_ERROR: ICustomError = {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  };

export const USER_NOT_FOUND : ICustomError = {
    status:HttpStatus.NOT_FOUND,
    description:'user not found'
}