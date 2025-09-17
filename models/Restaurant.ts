import mongoose, { Schema, model, models } from "mongoose";

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  cuisine: String,
  destinationId: { type: Schema.Types.ObjectId, ref: "Destination" },
});

const Restaurant = models.Restaurant || model("Restaurant", RestaurantSchema);
export default Restaurant;
