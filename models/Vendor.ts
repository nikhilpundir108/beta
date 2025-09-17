import mongoose, { Schema, model, models } from "mongoose";

const VendorSchema = new Schema({
  name: { type: String, required: true },
  service: String,
  contact: String,
  image: String,
  destinationId: { type: Schema.Types.ObjectId, ref: "Destination" },
});

const Vendor = models.Vendor || model("Vendor", VendorSchema);
export default Vendor;
