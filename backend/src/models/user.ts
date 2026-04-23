import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: false}, // Optional for Google users
  profilePhoto: {type: String, required: false}, // User's profile picture URL
  googleUID: {type: String, required: false}, // Google UID for future reference
  lastLogin: {type: Date, default: Date.now}

}, {timestamps: true, versionKey: false})

userSchema.pre('save', async function() {
  // Only hash password if it exists and has been modified
  if (!this.password || !this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('user', userSchema);
export default User;


