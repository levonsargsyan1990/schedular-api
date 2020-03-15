import express from 'express';

import serviceRoutes from './service';

const router = express.Router();

router.use('/services', serviceRoutes);

export default router;
