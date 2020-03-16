import express from 'express';

import serviceRoutes from './service.route';
import providerRoutes from './provider.route';
import bookingRoutes from './booking.route';
import optionRoutes from './option.route';

const router = express.Router();

router.use('/services', serviceRoutes);

router.use('/options', optionRoutes);

router.use('/providers', providerRoutes);

router.use('/bookings', bookingRoutes);

export default router;
