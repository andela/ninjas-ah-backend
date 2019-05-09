import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getOne = async (condition = {}) => dbFindSingle(db.Comment, condition);
module.exports = { getOne };
