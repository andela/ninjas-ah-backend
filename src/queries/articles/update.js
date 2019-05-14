import db from '../../models';
// import status from '../../config/status';
/**
 * @param {object} data inputs data to be saved in db
 * @param {object} slug unique slug to update article
 * @returns {object} Object representing the response returned
 */
export default async (data = {}, slug) => {
  const response = await db.Article.update(data, { where: { slug }, logging: false });
  return response;
};
