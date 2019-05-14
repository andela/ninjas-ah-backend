import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getSingleLike = async (condition = {}) => dbFindSingle(db.ArticleLike, condition);
export default getSingleLike;
