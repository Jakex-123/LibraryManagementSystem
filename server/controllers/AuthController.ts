//@ts-nocheck

import { ConnectDB } from "../db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/users";

export default class AuthController {
  static async signupUser(req: Request, res: Response) {
    try {
      await ConnectDB();
      const { name, email, password, phone, role } = req.body;

      const validRoles = ["user", "admin"];
      if (role && !validRoles.includes(role)) {
        return res.status(400).json({
          message: "Invalid role provided",
          success: false,
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User with this email already exists",
          success: false,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role: role || "user",
      });

      if (user) {
        return res.json({ message: "Signup Successful", success: true });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Server Error", success: false });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      await ConnectDB();
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid password",
          success: false,
        });
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "365d" });

      return res.json({
        message: "Login successful",
        success: true,
        access_token: `Bearer ${token}`,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Server Error", success: false });
    }
  }
}
