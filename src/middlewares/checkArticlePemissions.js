import status from '../config/status';

const checkArticlePemissions = role => (req, res, next) => ((role[req.user.role] === 'self' && req.user.id === req.article.userId)
  || role[req.user.role] === 'all'
  ? next()
  : res.status(status.UNAUTHORIZED).json({
    errors: {
      permission: "you don't have the required permission to perform this action"
    }
  }));

export default checkArticlePemissions;
