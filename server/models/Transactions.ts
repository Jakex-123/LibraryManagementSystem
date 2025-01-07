import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required:false },
  },
  {timestamps:true}
);
  
export const Transaction = mongoose.model('Transaction', transactionSchema);
  