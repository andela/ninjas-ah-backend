import db from '../../models';
import { dbDelete } from '../../helpers/queryHelper';

const remove = async (condition = {}) => dbDelete(db.Comment, condition);
export default remove;
