import Stripe from 'stripe';
import env from '../config/env';

const stripe = Stripe(env.stripe.secretKey);

// Customers
export const createCustomer = async ({ name }) => {
  return stripe.customers.create({ name });
};

// Tokens
export const createCardToken = async ({
  name,
  cvc,
  expiry,
  number,
  addressLine1,
  addressLine2,
  city,
  state,
  zip,
  country,
}) => {
  return stripe.tokens.create({
    card: {
      number,
      exp_month: parseInt(expiry.split('/')[0]),
      exp_year: parseInt(expiry.split('/')[1]),
      cvc,
      name,
      address_line1: addressLine1,
      address_line2: addressLine2,
      address_city: city,
      address_state: state,
      address_zip: zip,
      address_country: country,
    }
  });
};

// Cards
export const createCard = async ({
  customerId,
  tokenId,
}) => {
  return stripe.customers.createSource(customerId, {
    source: tokenId
  });
};

// Products
export const listProducts = async () => {
  const { data: products } = await stripe.products.list();
  return products;
};

// Prices
export const listPrices = async () => {
  const { data: prices } = await stripe.prices.list();
  return prices;
};

export const listProductPrices = async ({ productId }) => {
  const prices = await listPrices();
  return prices.filter(price => price.product === productId);
};

// Subscriptions
export const createSubscription = async ({ customerId, priceId }) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      { price: priceId },
    ],
  });
  return subscription;
};
