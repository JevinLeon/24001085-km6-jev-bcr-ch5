const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  addUser,
  getUserByEmail,
  getUserById,
} = require("../../repositories/user");

exports.register = async (payload) => {
  const user = await addUser(payload);

  delete user.dataValues.password;

  const jwtPayload = {
    id: user.id,
  };

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user, token };
};

exports.login = async (email, password) => {
  const user = await getUserByEmail(email);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  delete user?.password;

  if (isPasswordValid) {
    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { user, token };
  }

  throw new Error("Wrong credentials");
};

exports.profile = async (id) => {
  const data = await getUserById(id);

  if (!data) {
    throw new Error(`User is not found!`);
  }

  if (data?.dataValues?.password) {
    delete data.dataValues.password;
  } else {
    delete data?.password;
  }

  return data;
};
