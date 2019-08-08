import db from '../../models';

/**
 * Publish article
 * @param {object} slug unique slug for article to be deleted
 * @returns {object} Object representing the response returned
 */
export default async (slug) => {
  const response = await db.Article.update(
    {
      status: 'deleted'
    },
    { where: { slug }, logging: false }
  );
  return response;
};
