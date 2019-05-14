import db from '../../models';

const getSingleDislike = async (condition = {}) => db.ArticleDislike.findOne({ where: condition });

export default getSingleDislike;
