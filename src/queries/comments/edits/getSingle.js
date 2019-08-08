import db from '../../../models';
import { dbFindSingle } from '../../../helpers/queryHelper';

const getSingle = async (condition = {}) => dbFindSingle(db.CommentEdit, condition);
export default getSingle;
