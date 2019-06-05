import db from '../../models';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (data) => {
  const response = await db.Gallery.create(data, { logging: false });
  return response;
};
