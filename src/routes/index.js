import express from 'express';
import authRoutes from './auth.route';
// import userPrivateRoutes from './userPrivate.route';
import organizationPrivateRoutes from './organizationPrivate.route';
import organizationRoutes from './organization.route';
import planRoutes from './plan.route';
import userRoutes from './user.route';
import cardRoutes from './card.route';
import integrationRoutes from './integration.route';

import {
  user as userAuthMiddleware,
  organization as organizationAuthMiddleware,
} from '../middleware/auth.middleware';

import { checkHealth } from '../controllers/health';

const router = express.Router();

router.get('/health', checkHealth);

router.use('/integrations', integrationRoutes);

router.use('/auth', authRoutes);

router.use('/users', userAuthMiddleware, userRoutes);

router.use('/cards', userAuthMiddleware, cardRoutes);

router.use('/organizations', organizationRoutes);

router.use('/plans', planRoutes);

// router.use(userAuthMiddleware, userPrivateRoutes);

router.use(organizationAuthMiddleware, organizationPrivateRoutes);

export default router;
