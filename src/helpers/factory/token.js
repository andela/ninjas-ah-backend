// eslint-disable-next-line import/no-extraneous-dependencies
import { Factory } from 'rosie';
import tokenGenarator from '../tokens/tokenGenerator';

export default Factory.define('token').attr('token', tokenGenarator({ id: 0, role: 'admin' }));
