import { Factory } from 'rosie';
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('editComment')
  .sequence('id')
  .attr('body', chance.paragraph({ sentences: 1 }));
