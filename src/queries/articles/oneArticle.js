import db from '../../models';
import { dbFindSingle } from '../helpers/queryHelper';

const getOne = async (condition = {}) => dbFindSingle(db.Article, condition);
module.exports = { getOne };
