import express from 'express';
import authRoutes from './auth.route';
import privateRoutes from './private.route';
import organizationRoutes from './organization.route';

import {
  user as userAuthMiddleware,
  organization as organizationAuthMiddleware,
} from '../middleware/auth.middleware';

import { checkHealth } from '../controllers/health';

const router = express.Router();

router.get('/health', checkHealth);

router.use('/auth', authRoutes);

router.use('/organizations', userAuthMiddleware, organizationRoutes);

router.use(organizationAuthMiddleware, privateRoutes);

export default router;
