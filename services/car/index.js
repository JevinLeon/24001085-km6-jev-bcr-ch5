const carRepo = require("../../repositories/car");

exports.getCars = async () => {
  const data = await carRepo.getCars();
  return data;
};

exports.getCar = async (id) => {
  const data = await carRepo.getCar(id);
  return data;
};

exports.addCar = async (payload) => {
  const data = await carRepo.addCar(payload);
  return data;
};

exports.updateCar = async (id, payload) => {
  const data = await carRepo.updateCar(id, payload);
  return data;
};

exports.deleteCar = async (id) => {
  const data = await carRepo.deleteCar(id);
  return data;
};
