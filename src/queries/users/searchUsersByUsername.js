import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

export default async (username, offset = 0, limit = 50) => dbFindAll(
  db.User,
  {
    [db.Op.and]: [
      {
        username: {
          [db.Op.iLike]: `${username}%`
        }
      }
    ]
  },
  offset,
  limit
);
