import status from '../config/status';

import { Tag } from '../queries';

/**
 * Author: Gilles Kagarama
 * @returns {object} Object representing the response returned
 */
class TagsController {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async update(req, res) {
    const action = req.method === 'DELETE' ? 'delete' : 'update';
    const response = await Tag.update(req.body.tagList, req.params.slug, action);
    return res.status(action === 'update' ? status.CREATED : status.OK).send({
      response
    });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async getAll(req, res) {
    const tags = await Tag.get();
    return res.status(status.OK).send({
      tags
    });
  }
}

// validation
export default TagsController;
