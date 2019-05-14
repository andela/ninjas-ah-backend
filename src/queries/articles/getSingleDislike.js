import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getSingleDislike = async (condition = {}) => dbFindSingle(db.ArticleDislike, condition);
export default getSingleDislike;
