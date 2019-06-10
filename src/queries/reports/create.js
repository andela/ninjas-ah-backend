import db from '../../models';
import { dbCreate } from '../../helpers/queryHelper';

const create = async data => dbCreate(db.Report, data);

export default create;
