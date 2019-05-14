import db from '../../models';
import { dbDelete } from '../../helpers/queryHelper';

const deleteComment = async (condition = {}) => dbDelete(db.Comment, condition);
export default deleteComment;
