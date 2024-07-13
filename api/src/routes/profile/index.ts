import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import $get from './$get';
import $put from './$put';

const profileRouter = Router();

// Step 2: the function of reading and writing DID Space is implemented
profileRouter.get('/', middleware.user(), $get);
profileRouter.put('/', middleware.user(), $put);

export default profileRouter;
