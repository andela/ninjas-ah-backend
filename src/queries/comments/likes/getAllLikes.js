import db from '../../../models';
import { dbFindAll } from '../../../helpers/queryHelper';

const getAllLikes = async condition => dbFindAll(db.CommentLike, condition);

export default getAllLikes;
