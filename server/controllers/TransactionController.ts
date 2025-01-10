//@ts-nocheck

import type { Request, Response } from "express";
import { Book } from "../models/bbooks";
import { Transaction } from "../models/ttransactions";
import { User } from "../models/Users";  // Import User model

class TransactionController {
  static async borrowBook(req: Request, res: Response) {
    const { bookId } = req.body;
    const userId = req.user?.id;
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      if (book.availableCopies <= 0) {
        return res.status(404).json({
          success: false,
          message: "No available copies",
        });
      }

      // Check if the user has already borrowed the book
      const existingTransaction = await Transaction.findOne({ userId, bookId, returnDate: null });
      if (existingTransaction) {
        return res.status(400).json({
          success: false,
          message: "You have already borrowed this book and not returned it yet",
        });
      }

      // Create transaction
      await Transaction.create({ bookId, userId, borrowDate: new Date() });

      // Update book availability
      

      // Add the book to the user's books array
      const user = await User.findById(userId);
      if (user) {
        user.books.push(bookId);
        await user.save();
      }
      book.availableCopies -= 1;
      await book.save();
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        copies: book.availableCopies,
      });
    } catch (e) {
      console.error("Error borrowing book:", e.message);
      res.status(500).json({
        success: false,
        message: "An error occurred while borrowing the book",
        error: e.message || "Internal Server Error",
      });
    }
  }

  static async returnBook(req: Request, res: Response) {
    const { bookId,userId } = req.body; // Assuming bookId is passed in the request body
    console.log(bookId,userId)
    try {
      // Find the transaction using bookId and userId
      const transaction = await Transaction.findOne({
        bookId: bookId,
        userId: userId,
        returnDate: { $exists: false }, // Ensure the book hasn't been returned yet
      });
  
      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found or book already returned",
        });
      }
  
      // Update the returnDate of the transaction
      transaction.returnDate = new Date();
      await transaction.save();
  
      // Find the book and update availableCopies
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }
  
      book.availableCopies += 1;
      await book.save();
  
      // Remove the book from the user's books array
      const user = await User.findById(userId);
      if (user) {
        user.books = user.books.filter((id: string) => id.toString() !== book.id);
        await user.save();
      }
  
      res.status(200).json({
        success: true,
        message: "Book returned successfully",
        transaction,
      });
    } catch (error) {
      console.error("Error returning book:", error.message);
      res.status(500).json({
        success: false,
        message: "An error occurred while returning the book",
        error: error.message || "Internal Server Error",
      });
    }
  }
  
}

export default TransactionController;
