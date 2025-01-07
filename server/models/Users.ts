import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, default: "user" },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Books" }]  // Add this field
});

export const User = mongoose.model('User', userSchema);
