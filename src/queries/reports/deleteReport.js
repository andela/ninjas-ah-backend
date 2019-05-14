import db from '../../models';
import { dbDelete } from '../../helpers/queryHelper';

const deleteReport = async (condition = {}) => dbDelete(db.Report, condition);
export default deleteReport;
