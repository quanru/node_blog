import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {type: String, index: {unique: true}},
  password: String,
  avatar: {
    type: String,
    default: '/images/default-avatar.jpg'
  },
  title: {
    type: String,
    default: '未命名日记'
  },
  description: {
    type: String,
    default: '还没有添加任何描述......'
  },
  active: {
    type: Boolean,
    default: false
  },
  activeToken: String,
  activeExpires: Date
});
UserSchema.plugin(passportLocalMongoose);
export default mongoose.model('User', UserSchema);