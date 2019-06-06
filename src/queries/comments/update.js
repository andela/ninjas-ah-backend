import db from '../../models';
import { dbUpdate } from '../../helpers/queryHelper';

// eslint-disable-next-line max-len
const update = async (condition, whereCondition) => dbUpdate(db.Comment, condition, whereCondition);

export default update;
