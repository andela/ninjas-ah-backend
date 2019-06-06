import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getSingle = async (condition = {}) => dbFindSingle(db.Comment, condition);
export default getSingle;
