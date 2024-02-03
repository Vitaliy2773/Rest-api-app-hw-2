const User = require("../models/userModel");
const fs = require("fs").promises;
const jimp = require("jimp");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const avatarURL = gravatar.url(email, { s: "250", r: "pg", d: "mm" });

    const newUser = new User({ email, password, avatarURL });
    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Error registering new user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

const logout = async (req, res) => {
  try {
    const user = req.user;
    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const { subscription } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { subscription },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    res.status(500).json({ message: "Error updating subscription" });
  }
};

const updateAvatar = async (req, res) => {
  try {
    if (req.file) {
      const { path: tempPath, filename } = req.file;
      const avatar = await jimp.read(tempPath);
      await avatar.resize(250, 250).writeAsync(tempPath);
      const targetPath = path.join(
        __dirname,
        "..",
        "public",
        "avatars",
        filename
      );
      await fs.rename(tempPath, targetPath);
      const avatarURL = `/avatars/${filename}`;
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { avatarURL },
        { new: true }
      );
      res.json({ avatarURL: updatedUser.avatarURL });
    } else {
      res.status(400).json({ message: "No avatar file uploaded" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
