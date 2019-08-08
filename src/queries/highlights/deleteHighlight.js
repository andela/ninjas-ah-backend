import db from '../../models';
import { dbDelete } from '../../helpers/queryHelper';

const deleteHighlight = async (condition = {}) => dbDelete(db.Highlight, condition);

export default deleteHighlight;
