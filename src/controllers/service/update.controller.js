import { Success } from '../../utils';

/**
 * Updates the service
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} req.body - Body of request
 * @param {String} req.body.name - Name of service
 * @param {String} [req.body.description] - Description of service
 * @param {Boolean} [req.body.active] - Activity state of service
 */
export const update = async (req, res, next) => {
  try {
    const { service, body } = req;
    Object.keys(body).forEach((key) => {
      service[key] = body[key];
    });
    await service.save();
    return new Success({ data: service, res }).send();
  } catch (err) {
    next(err);
  }
};
