import db from '../../models';

const getAllLikes = async (condition = {}) => db.ArticleLike.findAll(condition, { logging: false });

export default getAllLikes;
