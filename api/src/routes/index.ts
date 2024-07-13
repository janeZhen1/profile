import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import profileRouter from './profile';
import todoListRouter from './todo-list';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/todo-list', middleware.user(), todoListRouter);
router.use('/profile', middleware.user(), profileRouter);

export default router;
