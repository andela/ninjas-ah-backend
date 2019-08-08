import db from '../../../models';
import { dbCreate } from '../../../helpers/queryHelper';

const create = async data => dbCreate(db.CommentEdit, data);

export default create;
