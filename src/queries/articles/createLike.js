import db from '../../models';
import { dbCreate } from '../../helpers/queryHelper';

const createLike = async (data = {}) => dbCreate(db.ArticleLike, data);

export default createLike;
