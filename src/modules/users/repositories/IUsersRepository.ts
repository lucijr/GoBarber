import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUser from '../entities/IUser';

export default interface IUsersRespository {
  create(data: ICreateUserDTO): Promise<IUser>;
  save(data: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
}
