import db from '../../../models';
import { dbUpdate } from '../../../helpers/queryHelper';

// eslint-disable-next-line max-len
const updateLike = async (condition, whereCondition) => dbUpdate(db.ArticleLike, condition, whereCondition);

export default updateLike;
