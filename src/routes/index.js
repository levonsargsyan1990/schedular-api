import express from 'express';

import serviceRoutes from './service.route';
import providerRoutes from './provider.route';

const router = express.Router();

router.use('/services', serviceRoutes);

router.use('/providers', providerRoutes);

export default router;
