import db from '../../models';

const getSingleLike = async (condition = {}) => db.ArticleLike.findOne({ where: condition });

export default getSingleLike;
