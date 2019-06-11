import status from '../config/status';

export default async (req, res, next) => (req.user.role === 'normal'
    && req.body
    && req.body.preference
    && res.status(status.UNAUTHORIZED).json({
      errors: {
        permission: 'sorry, you can not update this notification'
      }
    }))
  || next();
