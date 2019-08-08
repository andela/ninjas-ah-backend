// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('user')
  .sequence('id')
  .attr('firstName', chance.first())
  .attr('lastName', chance.last())
  .attr('username', chance.word({ length: 5 }))
  .attr('email', chance.email({ domain: 'example.com' }))
  .attr('password', 'Baaa1234!')
  .attr('role', 'normal')
  .attr(
    'permissions',
    JSON.stringify({
      articles: ['read', 'create', 'delete', 'edit'],
      comments: ['read', 'create', 'delete', 'edit'],
      tags: ['read', 'create', 'delete'],
      users: ['read', 'create', 'edit', 'delete']
    })
  );
