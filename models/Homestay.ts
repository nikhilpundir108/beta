import mongoose, { Schema, model, models } from "mongoose";

const HomestaySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  price: Number,
  destinationId: { type: Schema.Types.ObjectId, ref: "Destination" },
});

const Homestay = models.Homestay || model("Homestay", HomestaySchema);
export default Homestay;
