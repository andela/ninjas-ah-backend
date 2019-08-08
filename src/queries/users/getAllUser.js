import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

export default async (condition, offset, limit) => dbFindAll(db.User, condition, offset, limit);
