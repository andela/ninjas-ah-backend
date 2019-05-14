import db from '../../models';
import { dbCreate } from '../../helpers/queryHelper';

const createDislike = async (data = {}) => dbCreate(db.ArticleDislike, data);

export default createDislike;
