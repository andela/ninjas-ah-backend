import db from '../../models';
import { dbCreate } from '../../helpers/queryHelper';

const createLike = async condition => dbCreate(db.CommentLike, condition);
export default createLike;
