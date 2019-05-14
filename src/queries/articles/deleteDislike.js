import db from '../../models';
import { dbDelete } from '../../helpers/queryHelper';

const deleteDislike = async (condition = {}) => dbDelete(db.ArticleDislike, condition);
export default deleteDislike;
