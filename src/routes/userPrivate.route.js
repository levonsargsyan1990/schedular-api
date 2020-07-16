import express from 'express';

import cardRoutes from './card.route';

const privateRouter = express.Router();

privateRouter.use('/cards', cardRoutes);

export default privateRouter;
