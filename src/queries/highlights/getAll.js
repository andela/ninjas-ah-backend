import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

const getAll = async (condition = {}) => dbFindAll(db.Highlight, condition);

export default getAll;
