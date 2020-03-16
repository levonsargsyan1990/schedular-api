import express from 'express';

import serviceRoutes from './service.route';
import providerRoutes from './provider.route';
import bookingRoutes from './booking.route';

const router = express.Router();

router.use('/services', serviceRoutes);

router.use('/providers', providerRoutes);

router.use('/bookings', bookingRoutes);

export default router;
