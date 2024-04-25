const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { getData, setData } = require("../../helper/redis");
const crypto = require("crypto");
const path = require("path");
const { uploader } = require("../../helper/cloudinary");

exports.addUser = async (payload) => {
  const isEmailExisted = await User.findOne({
    where: {
      email: payload.email,
    },
  });

  if (isEmailExisted) {
    throw new Error("Email has already been taken!");
  }

  payload.password = bcrypt.hashSync(payload.password, 10);

  if (payload.photo) {
    const { photo } = payload;

    photo.publicId = crypto.randomBytes(16).toString("hex");

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

    const imageUpload = await uploader(photo);
    payload.photo = imageUpload.secure_url;
  } else {
    payload.photo =
      "https://res.cloudinary.com/dv2jeayrr/image/upload/v1714061176/62b30b04ffc6772555eaa75b60b5f06a.jpg";
  }

  const data = await User.create(payload);

  const key = `users:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.getUserById = async (id) => {
  const key = `user:${id}`;

  let data = await getData(key);
  if (data) {
    return data;
  }

  data = await User.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`User is not found!`);
};

exports.getUserByEmail = async (email) => {
  const key = `user:${email}`;

  let data = await getData(key);
  if (data) {
    return data;
  }

  data = await User.findAll({
    where: {
      email,
    },
  });
  if (data.length > 0) {
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`User is not found!`);
};
