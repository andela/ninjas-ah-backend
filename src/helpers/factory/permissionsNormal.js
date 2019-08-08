// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';

export default Factory.define('permissionsNormal')
  .attr('userType', 'normal')
  .attr(
    'permissions',
    JSON.stringify({
      articles: ['read', 'create', 'delete', 'edit'],
      comments: ['read', 'create', 'delete', 'edit'],
      tags: ['read', 'create', 'delete'],
      users: ['read', 'create', 'edit', 'delete']
    })
  );
