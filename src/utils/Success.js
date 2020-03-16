import httpStatus from 'http-status';

/**
 * Class representing a successful result
 */
export class Success {
  /**
   * Creates an API error.
   * @param {number} status - HTTP status code of error.
   * @param {*} data - Payload that will be returned in HTTP response.
   * @param {Object} res - HTTP response object.
   */
  constructor({
    status = httpStatus.OK, data, res,
  }) {
    this.name = this.constructor.name;
    this.status = status;
    this.data = data;
    this.res = res;
  }

  /**
   * Sends HTTP response
   *
   * @memberof Success
   */
  send() {
    const response = {
      status: this.status,
      data: this.data,
    };
    this.res.status(this.status);
    this.res.json(response);
  }
}
