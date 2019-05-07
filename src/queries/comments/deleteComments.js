import db from '../../models';
import { dbDelete } from '../helpers/queryHelper';

const deleteElement = async (condition = {}) => dbDelete(db.Comment, condition);
module.exports = { deleteElement };
