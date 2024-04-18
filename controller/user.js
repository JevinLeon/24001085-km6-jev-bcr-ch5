const { register, login, profile } = require("../services/auth");

exports.register = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    const { photo } = req.files;

    if (email == "" || !email) {
      return next({
        message: "Email must be filled",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled",
        statusCode: 400,
      });
    }
    if (name == "" || !name) {
      return next({
        message: "Name must be filled",
        statusCode: 400,
      });
    }
    if (role == "" || !role) {
      role = "user";
    }

    const data = await register({
      email,
      password,
      name,
      photo,
      role,
    });

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const { photo } = req.files;
    const role = "admin";

    if (email == "" || !email) {
      return next({
        message: "Email must be filled",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled",
        statusCode: 400,
      });
    }
    if (name == "" || !name) {
      return next({
        message: "Name must be filled",
        statusCode: 400,
      });
    }

    const data = await register({
      email,
      password,
      name,
      photo,
      role,
    });

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email == "" || !email) {
      return next({
        message: "Email must be filled",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled",
        statusCode: 400,
      });
    }

    const data = await login(email, password);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const data = await profile(req.user.id);
    console.log(data);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
