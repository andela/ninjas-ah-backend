import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getSingleArticle = async (condition = {}) => dbFindSingle(db.Article, condition);
module.exports = { getSingleArticle };
