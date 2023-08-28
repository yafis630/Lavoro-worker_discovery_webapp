import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  birthDate: Date,
  email: String,
  phoneNumber: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
