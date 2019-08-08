import db from '../../models';
/**
 * @param {object} data inputs data to be saved in db
 * @param {object} slug unique slug to update article
 * @returns {object} Object representing the response returned
 */
export default async (data = {}, slug = '') => {
  const response = await db.Article.update(data, {
    where: { slug },
    logging: false,
    individualHooks: true
  });
  return response[0] ? response[1][0].get() : {};
};
