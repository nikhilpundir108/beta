import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email?: string;
  username?: string;
  imageUrl?: string;
  preferences?: {
    destination: string;
    travelType: string;
    budget: string;
    duration: string;
  };
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  // Use a sparse index: email must be unique *if it exists*, but multiple nulls are allowed.
  email: { type: String, unique: true, sparse: true },
  username: { type: String },
  imageUrl: { type: String },
  preferences: {
    destination: { type: String },
    travelType: { type: String },
    budget: { type: String },
    duration: { type: String },
  },
}, { timestamps: true });

const User = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;