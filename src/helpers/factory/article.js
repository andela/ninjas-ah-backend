// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('article')
  .sequence('id')
  .attr('userId', 1)
  .attr('title', chance.sentence(1))
  .attr('description', chance.sentence(1))
  .attr('body', chance.sentence(3))
  .attr('slug', 'going-home-like-a-dog-2aijv735e7w');
