import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const singleLike = async (condition = {}) => dbFindSingle(db.CommentLike, condition);
export default singleLike;
