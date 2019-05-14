import db from '../../models';
import { dbCreate } from '../../helpers/queryHelper';

const createComment = async data => dbCreate(db.Comment, data);

export default createComment;
