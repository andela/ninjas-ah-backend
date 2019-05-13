import bcrypt from 'bcrypt';

export default password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));
