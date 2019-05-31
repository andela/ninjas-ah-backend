import status from '../config/status';

import { upload } from '../helpers';

/**
 * A class to upload image
 */
export default class UploadController {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async save(req, res) {
    const image = await upload(req);
    return image
      ? res.status(status.CREATED).json({
        image
      })
      : res.status(status.BAD_REQUEST).json({
        errors: {
          image: 'Whoops, something went wrong while uploading your image. try again!'
        }
      });
  }
}
