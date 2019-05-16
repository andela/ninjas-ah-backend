import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

const getAllReports = async (condition = {}) => dbFindAll(db.ReportArticle, condition);
export default getAllReports;
