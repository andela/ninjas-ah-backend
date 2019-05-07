import db from '../../models';
import { dbUpdate } from '../helpers/queryHelper';

// eslint-disable-next-line max-len
const updateElement = async (condition = {}, whereCondition = {}) => dbUpdate(db.Comment, condition, whereCondition);

module.exports = { updateElement };
