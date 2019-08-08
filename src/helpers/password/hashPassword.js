import bcrypt from 'bcryptjs';

export default password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));
