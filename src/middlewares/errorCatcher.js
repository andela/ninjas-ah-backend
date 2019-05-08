import status from '../config/status';

const errorCatcher = controller => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    return res.status(status.SERVER_ERROR).json({
      message: err.message
    });
  }
};

export default errorCatcher;
