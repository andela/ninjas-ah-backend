import db from '../../models';
import { dbCreate } from '../../helpers/queryHelper';

const createLike = async condition => dbCreate(db.ArticleLike, condition);
export default createLike;
