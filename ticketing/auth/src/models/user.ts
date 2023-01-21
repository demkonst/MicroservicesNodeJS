import mongoose from 'mongoose';

interface UserAttrs {
  email: string;
  password: string
};

interface UserModel extends mongoose.Model<UserAttrs> {
  build(attrs: UserAttrs): UserAttrs;
};

const userSchema = new mongoose.Schema<UserAttrs>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserAttrs, UserModel>('user', userSchema);

export { User };