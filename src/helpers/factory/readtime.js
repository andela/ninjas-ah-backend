// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';

export default Factory.define('readtime')
  .attr('oneimage', 'Rosie, make it easy <img src="placeholder.jpg">')
  .attr('twoimage', 'Rosie, make it easy <img src="placeholder.jpg">  <img src="placeholder.jpg">')
  .attr(
    'threeimage',
    'Rosie, make it easy <img src="placeholder.jpg">  <img src="placeholder.jpg">  <img src="placeholder.jpg">'
  );
