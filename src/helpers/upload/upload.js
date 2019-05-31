import dotenv from 'dotenv';
import { cloudinaryConfig, uploader } from '../../config/cloudinaryConfig';
import { dataUri } from '../../middlewares/multer';

dotenv.config();
export default async (req) => {
  const { IMAGE_BASE_URL, NODE_ENV } = process.env;
  const cdnConnect = await cloudinaryConfig();

  const file = dataUri(req).content;

  const response = cdnConnect.cloud_name
    && cdnConnect.api_key
    && cdnConnect.api_secret
    && NODE_ENV !== 'test'
    && (await uploader.upload(file));
  return (
    !response || {
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
    }
  );
};
