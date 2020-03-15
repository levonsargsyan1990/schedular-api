import express from 'express';
import passport from 'passport';
import { list } from '../controllers/service';

const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), list);

export default router;
