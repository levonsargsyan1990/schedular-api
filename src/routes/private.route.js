import express from 'express';

import serviceRoutes from './service.route';
import providerRoutes from './provider.route';
import bookingRoutes from './booking.route';
import optionRoutes from './option.route';

export const privateRouter = express.Router();

privateRouter.use('/services', serviceRoutes);

privateRouter.use('/options', optionRoutes);

privateRouter.use('/providers', providerRoutes);

privateRouter.use('/bookings', bookingRoutes);
