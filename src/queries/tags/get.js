import db from '../../models';

/**
 * Get specific article
 * @returns {object} Array contains a list of tags in all articles
 */
export default async () => {
  const response = await db.Article.findAll({
    attributes: ['tagList'],
    limit: 10
  });
  let listOfTags = [];
  await Object.values(response).forEach((value) => {
    Object.values(value.dataValues.tagList).forEach((val) => {
      listOfTags = [...listOfTags, val];
    });
  });
  const treatedTags = [...new Set(listOfTags)].sort();
  return treatedTags;
};
