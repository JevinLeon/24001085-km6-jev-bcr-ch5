const { Car } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const crypto = require("crypto");
const path = require("path");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCars = async () => {
  const cars = await Car.findAll();

  return cars;
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
  if (payload.image) {
    const { image } = payload;
    image.publicId = crypto.randomBytes(16).toString("hex");
    image.name = `${image.publicId}${path.parse(image.name).ext}`;
    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }
  const newCar = await Car.create({ ...payload });
  const key = `cars:${newCar.id}`;
  await setData(key, newCar, 300);

  return newCar;
};

exports.updateCar = async (id, payload) => {
  const key = `cars:${id}`;
  const selectedCar = await Car.findOne({ where: { id } });

  if (selectedCar) {
    if (payload.image) {
      const { image } = payload;
      image.publicId = crypto.randomBytes(16).toString("hex");
      image.name = `${image.publicId}${path.parse(image.name).ext}`;
      const imageUpload = await uploader(image);
      payload.image = imageUpload.secure_url;
    }

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
