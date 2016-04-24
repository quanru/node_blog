import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, index: {unique: true}},
  password: String,
  avatar: {
    type: String,
    default: '/images/default-avatar.jpg'
  },
  title: {
    type: String,
    default: '未命名博客'
  },
  description: {
    type: String,
    default: '博主很懒，还没有添加任何描述......'
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