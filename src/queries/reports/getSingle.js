import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getSingle = async (condition = {}) => dbFindSingle(db.Report, condition);
export default getSingle;
