import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

const getAllComments = async condition => dbFindAll(db.Comment, condition);
export default getAllComments;
