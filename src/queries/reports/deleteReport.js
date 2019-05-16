import db from '../../models';
import { dbDelete } from '../../helpers/queryHelper';

const deleteReport = async (condition = {}) => dbDelete(db.ReportArticle, condition);
export default deleteReport;
