/* eslint-disable max-len */
import db from '../../../models';

const updateLike = async (condition = {}, whereCondition) => db.ArticleLike.update(condition, { where: whereCondition, logging: false });

export default updateLike;
