const manufactureRepo = require("../../repositories/manufacture");

exports.getManufactures = async () => {
  const data = await manufactureRepo.getManufactures();
  return data;
};

exports.getManufacture = async (id) => {
  const data = await manufactureRepo.getManufacture(id);
  return data;
};

exports.addManufacture = async (payload) => {
  const data = await manufactureRepo.addManufacture(payload);
  return data;
};

exports.updateManufacture = async (id, payload) => {
  const data = await manufactureRepo.updateManufacture(id, payload);
  return data;
};

exports.deleteManufacture = async (id) => {
  const data = await manufactureRepo.deleteManufacture(id);
  return data;
};
