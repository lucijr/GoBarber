import { hash } from 'bcryptjs';

import AppError from '@shared/error/AppError';
import IUsersRespository from '../repositories/IUsersRepository';
import IUser from '../entities/IUser';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRespository) {}

  public async execute({ name, email, password }: IRequest): Promise<IUser> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (checkUsersExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
export default CreateUserService;
