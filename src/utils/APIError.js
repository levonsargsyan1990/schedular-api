import httpStatus from 'http-status';
import ExtendableError from './ExtendableError';


/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {String} message - Error message.
   * @param {Number} status - HTTP status code of error.
   * @param {Boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message, errors, status, isPublic, stack,
    });
  }
}
