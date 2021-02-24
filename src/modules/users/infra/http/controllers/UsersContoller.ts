import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    user.password = '';

    return response.json(user);
  }

  public async updateAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateuserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateuserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    user.password = '';

    return response.json(user);
  }
}
