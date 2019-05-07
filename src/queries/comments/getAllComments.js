import db from '../../models';
import { dbFindAll } from '../helpers/queryHelper';

const getAll = async (condition = {}) => dbFindAll(db.Comment, condition);
module.exports = { getAll };
