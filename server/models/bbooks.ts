import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description:{type:String,required:true},
  genre:{type:String},
  pages:{type:Number},
  publicationYear: { type: Number, required: true },
  totalCopies: { type: Number, required: true, default: 1 },
  availableCopies: { type: Number, required: true, default: 1 },
  image:{type:String}
});

bookSchema.virtual('availabilityStatus').get(function() {
  return this.availableCopies > 0;
});

export const Book = mongoose.model('Books', bookSchema);
