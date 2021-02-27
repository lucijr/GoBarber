import AppError from '@shared/error/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Luciano Júnior',
      email: 'luciano@taragatech.com',
      password: '12345678',
    });

    const authenticate = await authenticateUser.execute({
      email: 'luciano@taragatech.com',
      password: '12345678',
    });

    expect(authenticate).toHaveProperty('token');
    expect(authenticate.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'luciano1@taragatech.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Luciano Júnior',
      email: 'luciano@taragatech.com',
      password: '12345678',
    });

    expect(
      authenticateUser.execute({
        email: 'luciano@taragatech.com',
        password: '897456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
