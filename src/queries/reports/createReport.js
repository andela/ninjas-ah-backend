import db from '../../models';
import { dbCreate } from '../../helpers/queryHelper';

const createReport = async (data = {}) => dbCreate(db.ReportArticle, data);

export default createReport;
