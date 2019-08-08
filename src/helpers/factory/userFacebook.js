// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';
import Chance from 'chance';

const chance = new Chance();

export default Factory.define('user')
  .attr('id', `${chance.integer({ min: 100, max: 100000 })}`)
  .attr('name', { familyName: chance.last(), givenName: chance.first() })
  .attr('emails', [{ value: chance.email({ domain: 'example.com' }) }])
  .attr('photos', [{ value: 'image.jpg' }])
  .attr('provider', 'facebook')
  .attr(
    'permissions',
    JSON.stringify({
      articles: ['read', 'create', 'delete', 'edit'],
      comments: ['read', 'create', 'delete', 'edit'],
      tags: ['read', 'create', 'delete'],
      users: ['read', 'create', 'edit', 'delete']
    })
  );
