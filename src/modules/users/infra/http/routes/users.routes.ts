import { Router } from 'express';
import 'express-async-errors';
import { container } from 'tsyringe';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UptadeUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = container.resolve(CreateUserService);

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  user.password = '';

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateuserAvatar = container.resolve(UptadeUserAvatarService);

    const user = await updateuserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    user.password = '';

    return response.json(user);
  },
);

export default usersRouter;
