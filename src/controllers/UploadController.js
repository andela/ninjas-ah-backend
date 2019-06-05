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
    return typeof response === 'object' && typeof response !== 'boolean' && response !== null
      ? (await Gallery.save({ image: response.image.original, userId: req.user.id }))
          && res.status(status.CREATED).json({
            response
          })
<<<<<<< HEAD
      : res.status(!req.file ? status.BAD_REQUEST : status.SERVER_ERROR).json({
        errors: {
          image: 'Whoops, something went wrong while uploading your image. try again!'
        }
      });
=======
      : (!req.file
          && res.status(status.BAD_REQUEST).json({
            errors: {
              image: 'sorry, you did not select image to be uploaded'
            }
          }))
          || res.status(status.SERVER_ERROR).json({
            errors: {
              image: 'sorry, your file was not uploaded'
            }
          });
>>>>>>> --amend
  }
}
