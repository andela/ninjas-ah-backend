import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

/**
 * @param {object} condition
 * @returns {object} an object the return permissions
 */

const getAll = async (condition = {}) => dbFindAll(db.Permission, condition);

export default getAll;
