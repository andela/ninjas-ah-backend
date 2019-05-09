import status from '../config/status';
/**
 * @param {object} controller catch error in controller
 * @returns {object} Object representing the response returned
 */
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
