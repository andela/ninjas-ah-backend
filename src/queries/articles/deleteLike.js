import db from '../../models';
import { dbDelete } from '../../helpers/queryHelper';

const deleteLike = async (condition = {}) => dbDelete(db.ArticleDislike, condition);
export default deleteLike;
