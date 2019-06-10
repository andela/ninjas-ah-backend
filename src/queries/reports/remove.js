import db from '../../models';
import { dbDelete } from '../../helpers/queryHelper';

const remove = async (condition = {}) => dbDelete(db.Report, condition);
export default remove;
