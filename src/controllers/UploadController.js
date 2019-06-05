import status from '../config/status';
import { Gallery, Article } from '../queries';
import { upload } from '../helpers';

/**
 * A class to upload image
 */
export default class UploadController {
  /**
   * Upload image, and save it to gallery table
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
      : res.status(!req.file ? status.BAD_REQUEST : status.SERVER_ERROR).json({
        errors: {
          image: !req.file
            ? 'sorry, you did not select image to be uploaded'
            : 'sorry, your file was not uploaded'
        }
      });
  }

  /**
   * Get image gallery for a given author
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async get(req, res) {
    const { limit, offset } = req.query;
    const galleries = await Gallery.get(parseInt(limit, 0) || 10, offset || 0, {
      userId: req.user.id
    });
    if (galleries.length >= 1 && !!galleries) {
      res.status(status.OK).send({
        galleries,
        galleryCount: galleries.length
      });
    } else {
      res.status(status.NOT_FOUND).send({
        errors: {
          gallery: "You don't have image gallery yet"
        }
      });
    }
  }

  /**
   * Update article coverUrl
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async setCover(req, res) {
    const message = await Article.updateCover(
      { coverUrl: req.body.coverUrl },
      req.params.slug,
      req.user.id
    );
    if (message[0] === 1) {
      return res.status(status.OK).send({ coverUrl: 'CoverUrl has been updated' });
    }
    return res
      .status(status.BAD_REQUEST)
      .send({ errors: { coverUrl: 'coverUrl not updated, try again' } });
  }
}
