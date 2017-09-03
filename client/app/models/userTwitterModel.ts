import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  });
  const UserTwitterModel = mongoose.model('UserTwitterModel', userSchema);
  
  export default UserTwitterModel;
    