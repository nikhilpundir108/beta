import mongoose, { Schema, model, models } from "mongoose";

const DestinationSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Destination = models.Destination || model("Destination", DestinationSchema);
export default Destination;
