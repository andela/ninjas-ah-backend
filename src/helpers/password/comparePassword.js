import bcrypt from 'bcrypt';

export default (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
