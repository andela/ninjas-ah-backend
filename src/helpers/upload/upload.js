import { cloudinaryConfig, uploader } from '../../config/cloudinaryConfig';
import { dataUri } from '../../middlewares/multer';

export default async (req) => {
  await cloudinaryConfig();
  let response = '';
  let result = '';
  if (req.file) {
    const file = dataUri(req).content;
    response = await uploader.upload(file);
    const { IMAGE_BASE_URL } = process.env;
    result = {
      info: {
        image_version: `v${response.version}`,
        image_id: response.public_id,
        image_format: response.format
      },
      image: {
        original: `v${response.version}/${response.public_id}.${response.format}`,
        thumbnail: `${IMAGE_BASE_URL}/w_600/v${response.version}/${response.public_id}.${
          response.format
        }`,
        square: `${IMAGE_BASE_URL}/w_320,ar_1:1,c_fill,g_auto,e_art:hokusai/v${response.version}/${
          response.public_id
        }.${response.format}`,
        circle: `${IMAGE_BASE_URL}/w_120,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v${
          response.version
        }/${response.public_id}.${response.format}`
      }
    };
  }
  return result;
};
