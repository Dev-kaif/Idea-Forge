import mongoose, { Schema } from 'mongoose';

// User Schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String },
});

export const UserModel = mongoose.model('User', userSchema);

// Content Schema
const contentSchema = new Schema({
  title: { type: String },
  description: { type: String },
  link: { type: String },
  linkType: { type: String },
  tags:[ { type:String, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

export const ContentModel = mongoose.model('Content', contentSchema);

// tags Schema
const tagsSchema = new Schema({
  tags:[ { type:String, ref: 'Tag' }],
});

export const TagsModel = mongoose.model('Tags', tagsSchema);

// Link Schema
const linkSchema = new Schema({
  hash: { type: String },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true }, 
});

export const LinkModel = mongoose.model('Link', linkSchema);
