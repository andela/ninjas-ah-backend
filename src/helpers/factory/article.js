// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';
// eslint-disable-next-line import/no-unresolved
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('article')
  .attr('id', 1)
  .attr('userId', 1)
  .attr('title', chance.sentence({ words: 5, min: 5, max: 255 }))
  .attr('description', chance.sentence({ min: 5, max: 255 }))
  .attr('body', chance.paragraph({ sentences: 10, min: 5, max: 300 }))
  .attr('coverUrl', 'placeholer.jpg')
  .attr('tagList', ['Capetown', 'Cairo'])
  .attr('slug', 'rosie-make-it-easy-1dh6jv9cn4sz')
  .attr('readTime', 0);
