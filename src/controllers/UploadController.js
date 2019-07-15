import dotenv from 'dotenv';
import status from '../config/status';
import { Gallery, Article } from '../queries';

dotenv.config();
const { IMAGE_BASE_URL, NODE_ENV } = process.env;
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
    const image = req.files && req.files[0];
    return typeof image === 'object' && typeof image !== 'boolean' && NODE_ENV !== 'test'
      ? (await Gallery.save({
        image: `${image.version}/${image.public_id}.${image.format}`,
        userId: 1
      }))
          && res.status(status.CREATED).json({
            image: {
              original: `v${image.version}/${image.public_id}.${image.format}`,
              thumbnail: `${IMAGE_BASE_URL}/w_600/v${image.version}/${image.public_id}.${
                image.format
              }`,
              square: `${IMAGE_BASE_URL}/w_320,ar_1:1,c_fill,g_auto,e_art:hokusai/v${
                image.version
              }/${image.public_id}.${image.format}`,
              circle: `${IMAGE_BASE_URL}/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v${
                image.version
              }/${image.public_id}.${image.format}`
            }
          })
      : res
        .status(status.BAD_REQUEST)
        .json({ errors: { image: 'sorry, you did not provide image to be uploaded' } });
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
