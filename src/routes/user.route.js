import express from 'express';
import {
  getMe,
} from '../controllers/user';

const router = express.Router();

router
  .route('/me')
  .get(getMe);

export default router;
