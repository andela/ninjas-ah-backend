import status from '../config/status';

import { cloudinaryConfig, uploader } from '../config/cloudinaryConfig';
import { dataUri } from '../middlewares/multer';
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
    await cloudinaryConfig();
    if (req.file) {
      const file = dataUri(req).content;
      const result = await uploader.upload(file);
      const { IMAGE_BASE_URL } = process.env;
      return res.status(status.CREATED).json({
        info: {
          image_version: `v${result.version}`,
          image_id: result.public_id,
          image_format: result.format
        },
        image: {
          original: result.secure_url,
          thumbnail: `${IMAGE_BASE_URL}/w_600/v${result.version}/${result.public_id}.${
            result.format
          }`,
          square: `${IMAGE_BASE_URL}/w_320,ar_1:1,c_fill,g_auto,e_art:hokusai/v${result.version}/${
            result.public_id
          }.${result.format}`,
          circle: `${IMAGE_BASE_URL}/w_120,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v${
            result.version
          }/${result.public_id}.${result.format}`
        }
      });
    }
  }
}
