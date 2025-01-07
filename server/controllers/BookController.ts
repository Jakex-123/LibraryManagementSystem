//@ts-nocheck

import type { Request, Response } from "express";
import { Book } from "../models/books";
import { getBookDetails } from "../utils/utils";

class BookController {
  static async getBookbyId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      res.status(200).json({
        success: true,
        book,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the book",
      });
    }
  }

  static async getAllBooks(req: Request, res: Response) {
    try {
      const books = await Book.find({});
      res.status(200).json({
        success: true,
        books,
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async getAvailableBooks(req: Request, res: Response) {
    try {
      const books = await Book.find({ availableCopies: { $gt: 0 } });
      res.status(200).json({
        success: true,
        message: "Available books fetched successfully",
        books,
      });
    } catch (error) {
      console.error("Error fetching available books:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching available books",
        error: error.message || "Internal Server Error",
      });
    }
  }

  static async updateBook(req: Request, res: Response) {
    const { id } = req.params; 
    const { title, author, totalCopies } = req.body;
    try {
      if (!title || !author || totalCopies === undefined) {
        return res
          .status(400)
          .json({ message: "Please provide title, author, and totalCopies" });
      }

      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      const totalOld = book.totalCopies;
      const availableOld = book.availableCopies;
      const borrowed = totalOld - availableOld;
      
      let newAvailableCopies = availableOld;
      
      if (totalCopies > totalOld) {
        newAvailableCopies += totalCopies - totalOld; // Increase available copies by the difference
      }
      
      if (totalCopies < borrowed) {
        return res.status(400).json({ message: "Total copies cannot be less than borrowed" });
      }
      
      if (totalCopies < totalOld) {
        const reducedCopies = totalOld - totalCopies;
        newAvailableCopies = Math.max(newAvailableCopies - reducedCopies, borrowed);
      }

      book.title = title;
      book.author = author;
      book.totalCopies = totalCopies;
      book.availableCopies = newAvailableCopies;

      const updatedBook = await book.save();

      return res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
      console.error("Error updating book:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async addBook(req: Request, res: Response) {
    const { title, author, publicationYear, totalCopies, availableCopies } =
      req.body;

    try {
      if (
        !title ||
        !author ||
        !publicationYear ||
        !totalCopies ||
        availableCopies < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Title, author, publication year, and total copies are required",
        });
      }

      const available =
        availableCopies !== undefined ? availableCopies : totalCopies;

      if (available > totalCopies) {
        return res.status(400).json({
          success: false,
          message: "Available copies cannot be greater than total copies",
        });
      }

      let { imageUrl, description, genre, pages } = await getBookDetails(
        author,
        title
      );
      if(isNaN(pages)) pages=100;

      const newBook = await Book.create({
        title,
        author,
        publicationYear,
        totalCopies,
        availableCopies: available,
        image: imageUrl,
        description: description || "Description not available", // Fallback if description is null
        genre:genre || 'fiction',
        pages:pages,
      });

      return res.status(201).json({
        success: true,
        message: "Book Added Successfully",
        book: newBook,
      });
    } catch (error) {
      console.error("Error adding book:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while adding the book",
        error: error.message || "Internal Server Error",
      });
    }
  }

  static async deleteBook(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while deleting the book",
        error: error.message || "Internal Server Error",
      });
    }
  }
}

export default BookController;
