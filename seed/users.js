import bcrypt from 'bcrypt';

const users = [
  {
    name: 'Adolfo Blanco',
    email: 'ajblanco156@gmail.com',
    confirm: 1,
    password: bcrypt.hashSync('admin', 10),
  },
];

export default users;
