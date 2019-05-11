// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('comment')
  .sequence('id')
  // .attr('userId', 1)
  .attr('body', chance.paragraph({ sentences: 1 }));
