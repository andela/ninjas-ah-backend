import db from '../../models';
import { dbDelete } from '../../helpers/queryHelper';

const deleteLike = async condition => dbDelete(db.CommentLike, condition);

export default deleteLike;
