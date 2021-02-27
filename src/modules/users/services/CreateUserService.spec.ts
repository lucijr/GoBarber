import AppError from '@shared/error/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Luciano Júnior',
      email: 'luciano@taragatech.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new users with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUser.execute({
      name: 'Luciano Júnior',
      email: 'luciano@taragatech.com',
      password: '12345678',
    });

    expect(
      createUser.execute({
        name: 'Luciano Júnior',
        email: 'luciano@taragatech.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
