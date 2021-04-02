import { Router } from 'express';
import { uuid } from 'uuidv4';

import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);

export default routes;
