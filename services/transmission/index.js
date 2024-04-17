const transmissionRepo = require("../../repositories/transmission");

exports.getTransmissions = async () => {
  const data = await transmissionRepo.getTransmissions();
  return data;
};

exports.getTransmission = async (id) => {
  const data = await transmissionRepo.getTransmission(id);
  return data;
};

exports.addTransmission = async (payload) => {
  const data = await transmissionRepo.addTransmission(payload);
  return data;
};

exports.updateTransmission = async (id, payload) => {
  const data = await transmissionRepo.updateTransmission(id, payload);
  return data;
};

exports.deleteTransmission = async (id) => {
  const data = await transmissionRepo.deleteTransmission(id);
  return data;
};
