import IUser from '@modules/users/entities/IUser';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<IUser> {
    const user: IUser = { id: uuid(), email, name, password };

    this.users.push(user);
    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
