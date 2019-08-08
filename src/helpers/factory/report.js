import { Factory } from 'rosie';
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('comment')
  .sequence('id')
  .attr('title', chance.word({ length: 5 }))
  .attr('body', chance.paragraph({ sentences: 2 }));
