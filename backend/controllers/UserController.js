const User = require("../models/User"); // Adjust the path to your User model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h" 
      });

      res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }, message: "User loged successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

 
}

module.exports = new UserController();
