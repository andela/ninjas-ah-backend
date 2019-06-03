import db from '../../../models';
import { dbFindAll } from '../../../helpers/queryHelper';

const getAllLikes = async condition => dbFindAll(db.ArticleLike, condition);

export default getAllLikes;
