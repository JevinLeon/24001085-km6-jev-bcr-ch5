const { Car } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const crypto = require("crypto");
const path = require("path");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCars = async () => {
  const Cars = await Car.findAll();

  return Cars;
};

exports.getCar = async (id) => {
  const key = `cars:${id}`;

  let data = await getData(key);
  if (data) {
    return data;
  }

  const selectedCar = await Car.findOne({
    where: {
      id,
    },
  });

  if (selectedCar) {
    await setData(key, selectedCar, 300);
    return selectedCar;
  }

  throw new Error("Car is not found!");
};

exports.addCar = async (payload) => {
  console.log(payload);
  // if (payload.photo) {
  //   const { photo } = payload;
  //   photo.publicId = crypto.randomBytes(16).toString("hex");
  //   photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;
  //   const imageUpload = await uploader(photo);
  //   payload.photo = imageUpload.secureUrl;
  // }
  const newCar = await Car.create({ ...payload });
  const key = `cars:${newCar.id}`;
  await setData(key, newCar, 300);

  return newCar;
};

exports.updateCar = async (id, payload) => {
  const key = `cars:${id}`;
  const selectedCar = await Car.findOne({ where: { id } });

  if (selectedCar) {
    const updatedCar = await selectedCar.update({ ...payload });
    await setData(key, updatedCar, 300);

    return updatedCar;
  }

  throw new Error("Car is not found!");
};

exports.deleteCar = async (id) => {
  const key = `cars:${id}`;
  const selectedCar = await Car.findOne({ where: { id } });

  if (selectedCar) {
    const deletedCar = await selectedCar.destroy();
    await deleteData(key);

    return deletedCar;
  }
};
