import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getSingleLike = async condition => dbFindSingle(db.CommentLike, condition);
export default getSingleLike;
