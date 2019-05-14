import db from '../../models';
import { dbUpdate } from '../../helpers/queryHelper';

// eslint-disable-next-line max-len
const updateArticle = async (condition, whereCondition) => dbUpdate(db.Article, condition, whereCondition);

export default updateArticle;
