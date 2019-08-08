// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';

export default Factory.define('permissionsAdmin')
  .attr('userType', 'admin')
  .attr(
    'permissions',
    JSON.stringify({
      articles: ['read', 'create', 'edit', 'delete'],
      comments: ['read', 'create', 'edit', 'delete'],
      tags: ['read', 'create', 'edit', 'delete'],
      users: ['read', 'create', 'edit', 'delete'],
      permissions: ['read', 'create', 'edit', 'delete']
    })
  );
