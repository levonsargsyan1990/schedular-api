import Card from '../../models/card.model';
import { Success } from '../../utils';
import { createCard, createCardToken } from '../../lib/stripe';

/**
 * Creates new booking
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.body - Body of request
 * @param {String} req.body.name - Cardholders name
 * @param {String} req.body.cvs - Card CVC
 * @param {String} req.body.expiry - Card expiry date
 * @param {String} req.body.number - Card number
 * @param {String} req.body.addressLine1 - Address line 1
 * @param {String} req.body.addressLine2 - Address line 2
 * @param {String} req.body.city
 * @param {String} req.body.state 
 * @param {String} req.body.zip 
 * @param {String} req.body.country 
 */
export const create = async (req, res, next) => {
  try {

    const {
      user, body, body: {
        name,
        expiry,
      },
    } = req;
    const cardToken = await createCardToken(body);
    const stripeCard = await createCard({
      customerId: user.stripeCustomerId,
      tokenId: cardToken.id,
    });
    // TODO handle validation fail
    const defaultCard = await user.card(); 
    const card = new Card({
      name,
      expiry,
      lastDigits: stripeCard.last4,
      userId: user._id,
      stripeCardId: stripeCard.id,
      isDefault: !defaultCard,
    });
    await card.save();
    return new Success({ data: card, res }).send();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
