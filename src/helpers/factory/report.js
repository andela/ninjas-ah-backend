/* eslint-disable import/no-extraneous-dependencies */
import { Factory } from 'rosie';
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('report')
  .sequence('id')
  .attr('reportTitle', chance.paragraph({ sentences: 1 }))
  .attr('reportBody', chance.paragraph({ sentences: 3 }))
  .attr('type', chance.pickone(['plagialism', 'sjdjsb', 'gfsjhhskdj', 'agsfjsgfdh']));
