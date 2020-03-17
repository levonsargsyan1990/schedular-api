import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';

/**
 * Class generating API key and API secret.
 */
export class APICredentials {
  /**
   * Generates API key for organization
   *
   * @static
   * @memberof APICredentials
   */
  static generateApiKey() {
    return uuidv4();
  }

  /**
   * Generates API secret for organization
   *
   * @static
   * @memberof APICredentials
   */
  static generateApiSecret() {
    return uuidv1();
  }
}
