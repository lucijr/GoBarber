import { Router } from 'express';
import 'express-async-errors';
import SessionsController from '../controllers/SessionsContoller';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
