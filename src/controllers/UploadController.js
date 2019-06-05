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
    const response = req.file && (await upload(req));
    return typeof response === 'object'
      ? (await Gallery.save({ image: response.image.original, userId: req.user.id }))
          && res.status(status.CREATED).json({
            response
          })
      : res.status(!req.file ? status.BAD_REQUEST : status.SERVER_ERROR).json({
        errors: {
          image: 'Whoops, something went wrong while uploading your image. try again!'
        }
      });
  }
}
