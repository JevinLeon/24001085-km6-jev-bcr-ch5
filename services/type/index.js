const typeRepo = require("../../repositories/type");

exports.getTypes = async () => {
  const data = await typeRepo.getTypes();
  return data;
};

exports.getType = async (id) => {
  const data = await typeRepo.getType(id);
  return data;
};

exports.addType = async (payload) => {
  const data = await typeRepo.addType(payload);
  return data;
};

exports.updateType = async (id, payload) => {
  const data = await typeRepo.updateType(id, payload);
  return data;
};

exports.deleteType = async (id) => {
  const data = await typeRepo.deleteType(id);
  return data;
};
