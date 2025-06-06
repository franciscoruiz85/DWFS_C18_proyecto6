const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  let foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json({ newUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al crear el usuario",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const foundedPassword = await bcryptjs.compare(
      password,
      foundUser.password
    );
    if (!foundedPassword) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrecta" });
    }

    const payload = { user: { id: foundUser.id } };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "30m" },
      (error, token) => {
        if (error) {
          return res.status(500).json({
            msg: "Error al generar el token",
            error: error.message,
          });
        }
        return res.json(token);
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al iniciar sesión",
      error: error.message,
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al validar el usuario",
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al consultar los usuarios",
      error: error.message,
    });
  }
};

exports.updateUserById = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password: hashedPassword },
      { new: true, runValdators: true }
    );
    return res.json({ updateUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al actualizar el usuario",
      error: error.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ deleteUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al eliminar el usuario",
      error: error.message,
    });
  }
};
