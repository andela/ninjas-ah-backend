import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

const getAllDislikes = async (condition = {}) => dbFindAll(db.ArticleDislike, condition);
export default getAllDislikes;
