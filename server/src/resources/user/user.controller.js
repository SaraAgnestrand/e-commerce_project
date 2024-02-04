const { UserModel } = require("./user.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(409).json("User already exists.");
    }
    const user = await UserModel(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  const existingUser = await UserModel.findOne({
    email: req.body.email,
  }).select("+password");

  if (!existingUser || !(await bcrypt.compare(req.body.password, existingUser.password))) {
    return res.status(401).json("Wrong password or username");
  }

  const user = existingUser.toJSON();
  user._id = existingUser._id;
  delete user.password;

  if (req.session && req.session._id) {
    return res.status(200).json(user);
  }
  req.session = user;
  res.status(200).json(user);
};

const logoutUser = async (req, res) => {
  if (!req.session._id) {
    return res.status(400).json("Cannot logout when you are not logged in");
  }
  req.session = null;
  res.status(204).json(null);
}

module.exports = { registerUser, loginUser, logoutUser };



