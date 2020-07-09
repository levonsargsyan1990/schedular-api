import express from 'express';
import { validate } from 'express-validation';
import {
  stripe,
} from '../controllers/integration';
// import { bookingExists } from '../middleware/booking.middleware';
// import bookingValidation from '../validation/booking.validation';

const stripeRouter = express.Router();

stripeRouter
  .route('/product/create')
  .post(stripe.createProduct)

stripeRouter
  .route('/product/update')
  .post(stripe.updateProduct)

stripeRouter
  .route('/product/delete')
  .post(stripe.deleteProduct)

stripeRouter
  .route('/price/create')
  .post(stripe.createPrice)

stripeRouter
  .route('/price/update')
  .post(stripe.updatePrice)

stripeRouter
  .route('/price/delete')
  .post(stripe.deletePrice)

const integrationRouter = express.Router();

integrationRouter
  .use('/stripe', stripeRouter)
  
export default integrationRouter;
