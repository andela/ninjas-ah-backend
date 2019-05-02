// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';

export default Factory.define('user')
  .sequence('id')
  .attr('firstName', 'John')
  .attr('lastName', 'Smith')
  .attr('username', 'josmi')
  .attr('email', 'josmi@gmail.com')
  .attr('password', 'Baaa1234!')
  .attr('role', 'admin')
  .attr('permissions', ['read', 'write', 'delete', 'edit']);
