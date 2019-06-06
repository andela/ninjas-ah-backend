// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('notification')
  .attr('userId', 1)
  .attr('message', chance.paragraph({ sentences: 1 }));
