import db from '../../models';
import { dbFindSingle } from '../../helpers/queryHelper';

const getSingleReport = async (condition = {}) => dbFindSingle(db.ReportArticle, condition);
export default getSingleReport;
