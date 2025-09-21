import mongoose, { Schema, Document } from 'mongoose';

// 1. Define a re-usable sub-schema for the suggestion items.
//    This tells Mongoose to expect objects with name, description, and cost.
const SuggestionItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: String, required: false }, // Cost can be optional
}, { _id: false }); // We don't need a separate _id for each suggestion item


// 2. Define the main Plan schema interface for TypeScript
export interface IPlan extends Document {
  clerkId: string;
  destination: string;
  suggestions: {
    restaurants: { name: string; description: string; cost?: string }[];
    vendors: { name: string; description: string; cost?: string }[];
    homestays: { name: string; description: string; cost?: string }[];
  };
  selected?: { // Make selected optional
    restaurants: string[];
    vendors: string[];
    homestays: string[];
  };
  finalItinerary?: string; // Make finalItinerary optional
}

// 3. Create the Plan Schema using the sub-schema from step 1
const PlanSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  destination: { type: String, required: true },
  suggestions: {
    restaurants: [SuggestionItemSchema], // Use the sub-schema here
    vendors: [SuggestionItemSchema],     // And here
    homestays: [SuggestionItemSchema],   // And here
  },
  selected: {
    restaurants: [String],
    vendors: [String],
    homestays: [String],
  },
  finalItinerary: { type: String },
}, { timestamps: true });


// 4. Export the model
export default mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema);