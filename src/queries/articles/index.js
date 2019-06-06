import create from './create';
import update from './update';
import get from './get';
import getAll from './getAll';
import * as bookmark from '../articleBookmarks';
import * as favorite from '../favoriteArticles';
import getUserArticles from './getUserArticles';
import updateCover from './updateCover';

export { favorite, bookmark };
export {
  create, update, get, getAll, getUserArticles, updateCover
};
