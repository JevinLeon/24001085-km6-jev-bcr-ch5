const jsonwebtoken = require("jsonwebtoken");

exports.getTokenFromHeaders = (headers) => {
  const { authorization } = headers;

  if (!authorization || authorization === "") {
    throw new Error("Unauthorized");
  }
  const splittedAuth = authorization.split(" ");

  if (splittedAuth.length < 2) {
    throw new Error("Unauthorized");
  }

  if (splittedAuth[0] !== "Bearer") {
    throw new Error("Unauthorized");
  }

  return splittedAuth[1];
};

exports.extractToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};
