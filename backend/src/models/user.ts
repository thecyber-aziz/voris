import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

// ✅ Interface add kiya — TypeScript ko types pata chalenge
export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string | null;
  profilePhoto?: string;
  googleUID?: string;
  lastLogin?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false, default: null }, // ✅ null default
  profilePhoto: { type: String, required: false },
  googleUID: { type: String, required: false },
  lastLogin: { type: Date, default: Date.now }
}, { timestamps: true, versionKey: false })

// ✅ 'this' ko IUser type diya — TypeScript error fix
userSchema.pre('save', async function(this: IUser) {
  if (!this.password || !this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model<IUser>('user', userSchema);
export default User;