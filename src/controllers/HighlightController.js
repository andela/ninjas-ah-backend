import status from '../config/status';
import { findOrCreate, getAll, deleteHighlight } from '../queries/highlights';

/**
 * Highlight controller class
 */
export default class Highlights {
  /**
   * create a highlighted
   * @param {object} req - User's request
   * @param {object} res - Response's holder
   * @returns {Object} response
   */
  static async create(req, res) {
    const userId = req.user.id;
    const { articleSlug } = req.params;
    const {
      highlightedText, startIndex, stopIndex, comment
    } = req.body;

    const contentLength = highlightedText.split('').length;
    const indexesLength = stopIndex - startIndex;
    if (contentLength !== indexesLength + 1) {
      return res.status(status.BAD_REQUEST).json({
        message: 'Sorry the length of your highlightedText does not match with start and end index'
      });
    }

    const created = await findOrCreate({
      articleSlug,
      userId,
      highlightedText,
      startIndex,
      stopIndex,
      comment
    });

    return res.status(status.CREATED).json({ message: 'You have highlighted this text', created });
  }

  /** ,
   * Get Highlights
   * @param {object} req
   * @param {object} res
   * @returns {object} highlights object
   */
  static async getHighlights(req, res) {
    const { articleSlug } = req.params;

    const highlights = await getAll({
      articleSlug
    });

    return (
      (highlights.length === 0
        && res.status(status.NOT_FOUND).json({
          message: 'You have no highlights'
        }))
      || res.status(status.OK).json({
        highlights
      })
    );
  }

  /** ,
   * Remove Highlights
   * @param {object} req
   * @param {object} res
   * @returns {object} message
   */
  static async deleteHighlights(req, res) {
    const { id, articleSlug } = req.params;

    const highlight = await deleteHighlight({ articleSlug, id });

    return (
      (!highlight
        && res.status(status.NOT_FOUND).json({
          message: `the highlight with id ${id} does not exist`
        }))
      || res.status(status.OK).json({
        message: 'You have successfully remove your highlight',
        highlight
      })
    );
  }
}
