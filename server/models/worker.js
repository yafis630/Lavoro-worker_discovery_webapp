import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  birthDate: Date,
  email: String,
  phoneNumber: String,
  password: String,
  profession: String,
  bio: String,
  available: Boolean,
});

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;
