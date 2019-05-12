import db from '../../models';

/**
 * @param {object} newTags tag lists data to be saved in db
 * @param {object} slug article identify
 * @param {object} action action method to perform¬
 * @returns {object} Array of updated tag list of the article
 */
export default async (newTags, slug, action) => {
  let result = [];
  let message = '';
  const response = await db.Article.findAll({
    limit: 1,
    where: { slug },
    attributes: ['tagList'],
    logging: false
  });
  if (action === 'update') {
    result = response[0].dataValues.tagList
      ? [...new Set([...response[0].dataValues.tagList, ...newTags])]
      : newTags;
    message = 'Tags have been created';
  } else {
    result = response[0].dataValues.tagList.filter(item => !newTags.includes(item));
    message = 'Tag have been deleted';
  }

  if (result.length <= 5) {
    await db.Article.update(
      { tagList: result },
      {
        where: { slug },
        logging: false
      }
    );
  } else {
    message = 'You can not create more than 5 tags per article';
  }
  return message;
};
