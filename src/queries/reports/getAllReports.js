import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

const getAllReports = async condition => dbFindAll(db.Report, condition);
export default getAllReports;
