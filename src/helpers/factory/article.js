// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';

export default Factory.define('article')
  .sequence('id')
  .attr('userId', 1)
  .attr('title', 'Going home like a dog')
  .attr('description', 'Holla and Holla')
  .attr('body', 'More about this the dance of chicken')
  .attr('slug', 'going-home-like-a-dog-2aijv735e7w');
