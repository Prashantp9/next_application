import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Location = mongoose.Schema("Location", locationSchema);
export default Location;
