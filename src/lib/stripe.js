import Stripe from 'stripe';
import env from '../config/env';

const stripe = Stripe(env.stripe.secretKey);

// Customers
export const createCustomer = async ({ name }) => {
  return stripe.customers.create({ name });
}

export const listProducts = async () => {
  const { data: products } = await stripe.products.list();
  return products;
}

export const listPrices = async () => {
  const { data: prices } = await stripe.prices.list();
  return prices;
}

export const listProductPrices = async ({ productId }) => {
  const prices = await listPrices();
  return prices.filter(price => price.product === productId);
}

export const createSubscription = async ({ customerId, priceId }) => {
  const { data: subscription } = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      { price: priceId },
    ],
  });
  return subscription;
}
