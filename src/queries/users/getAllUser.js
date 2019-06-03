import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

export default async condition => dbFindAll(db.User, condition);
