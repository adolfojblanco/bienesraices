//* Relaciones

import { Property } from './Property.js';
import { Category } from './Category.js';
import { User } from './User.js';

//Category.hasOne(Property);
Property.belongsTo(Category);
Property.belongsTo(User);

export { Category, User, Property };
