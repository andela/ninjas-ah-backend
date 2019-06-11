import db from '../../../models';
import { dbCreate } from '../../../helpers/queryHelper';

const create = async condition => dbCreate(db.ArticleLike, condition);
export default create;
