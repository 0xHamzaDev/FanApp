const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/User");
const { errorHandler } = require("../utils/errorHandler");

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = await createUser(name, email, hashedPassword);

    const token = jwt.sign({ email, id: userId }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ id: userId, name, email, token });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    res
      .status(200)
      .json({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        token,
      });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = { registerUser, loginUser };
