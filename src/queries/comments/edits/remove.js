import db from '../../../models';
import { dbDelete } from '../../../helpers/queryHelper';

const remove = async (condition = {}) => dbDelete(db.CommentEdit, condition);
export default remove;
