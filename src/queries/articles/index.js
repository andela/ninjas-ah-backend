import create from './create';
import update from './update';
import get from './get';
import getAll from './getAll';
import * as bookmark from '../articleBookmarks';
import * as favorite from '../favoriteArticles';
import getUserArticles from './getUserArticles';
import updateCover from './updateCover';
import * as rate from '../ratings';

export {
  create, update, favorite, bookmark
};
export {
  get, getAll, getUserArticles, updateCover, rate
};
