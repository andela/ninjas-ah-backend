import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getSingleComment = async (condition = {}) => dbFindSingle(db.Comment, condition);
module.exports = { getSingleComment };