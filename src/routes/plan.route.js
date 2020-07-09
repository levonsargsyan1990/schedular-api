import express from 'express';
import {
  list,
} from '../controllers/plan';

const router = express.Router();

router
  .route('/')
  .get(list)

export default router;
