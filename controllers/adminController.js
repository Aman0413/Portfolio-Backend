const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const { error, success } = require("../utils/responseWrapper");

const login = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send(error(400, "All fields are required"));
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.send(error(400, "You are not admin"));
  }

  const verifyPassword = await bcrypt.compare(password, admin.password);
  if (!verifyPassword) {
    return res.send(error(400, "Invalid credentials"));
  }

  return res.send(success(200, admin));
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send(400, "All fields are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!admin) {
    return res.send(error(400, "Signup failed"));
  }
  return res.send(success(201, admin));
};

module.exports = {
  login,
  signup,
};
