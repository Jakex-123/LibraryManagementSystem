//@ts-nocheck

import { User } from "../models/Users";

class UserController {
    static async getUsers(req, res) {
      try {
        const users = await User.find();
        return res.status(200).json({
          success: true,
          users,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
          success: false,
          message: "An error occurred while fetching users",
          error: error.message,
        });
      }
    }
  
    static async getUsersWithBooks(req, res) {
        try {
          const users = await User.find({ books: { $exists: true, $ne: [] } }).populate('books');
          return res.status(200).json({
            success: true,
            users,
          });
        } catch (error) {
          console.error("Error fetching users with books:", error);
      
          return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users with books",
            error: error.message,
          });
        }
      }
  }
  
  export default UserController;
  