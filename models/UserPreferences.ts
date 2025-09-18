import mongoose, { Schema, Document } from "mongoose";

export interface IUserPreferences extends Document {
  userId: string; // Clerk userId
  categories: string[]; // e.g. ["adventure", "heritage"]
  budget: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserPreferencesSchema = new Schema<IUserPreferences>(
  {
    userId: { type: String, required: true, unique: true }, // Clerk userId
    categories: { type: [String], default: [] },
    budget: { type: Number, default: 0 },
    duration: { type: Number, default: 1 }, // in days
  },
  { timestamps: true }
);

export default mongoose.models.UserPreferences ||
  mongoose.model<IUserPreferences>("UserPreferences", UserPreferencesSchema);
