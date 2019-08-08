import bcrypt from 'bcryptjs';

export default (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
