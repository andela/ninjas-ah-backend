import status from '../config/status';

export const canDeleteOrUnpublishArticle = (req, res) => (req.user.id === req.article.userId || req.user.role === 'admin'
  ? null
  : res.status(status.UNAUTHORIZED).json({
    errors: {
      authorization: "sorry, you don't have the required permission to perform this action"
    }
  }));

export const canEditOrPublishArticle = (req, res) => req.user.id !== req.article.userId
  && res.status(status.UNAUTHORIZED).json({
    errors: {
      authorization: "sorry, you don't have the required permission to perform this action"
    }
  });
