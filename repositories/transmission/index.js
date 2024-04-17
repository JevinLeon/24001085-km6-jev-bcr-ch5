const { Transmission } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getTransmissions = async () => {
  const transmissions = await Transmission.findAll();

  return transmissions;
};

exports.getTransmission = async (id) => {
  const key = `transmissions:${id}`;

  let data = await getData(key);
  if (data) {
    return data;
  }

  const selectedTransmission = await Transmission.findOne({
    where: {
      id,
    },
  });

  if (selectedTransmission) {
    await setData(key, selectedTransmission, 300);
    return selectedTransmission;
  }

  throw new Error("Transmission is not found!");
};

exports.addTransmission = async (payload) => {
  const newTransmission = await Transmission.create({ ...payload });
  const key = `transmissions:${newTransmission.id}`;
  await setData(key, newTransmission, 300);

  return newTransmission;
};

exports.updateTransmission = async (id, payload) => {
  const key = `transmissions:${id}`;
  const selectedTransmission = await Transmission.findOne({ where: { id } });

  if (selectedTransmission) {
    const updatedTransmission = await selectedTransmission.update({
      ...payload,
    });
    await setData(key, updatedTransmission, 300);

    return updatedTransmission;
  }

  throw new Error("Transmission is not found!");
};

exports.deleteTransmission = async (id) => {
  const key = `transmissions:${id}`;
  const selectedTransmission = await Transmission.findOne({ where: { id } });

  if (selectedTransmission) {
    const deletedTransmission = await selectedTransmission.destroy();
    await deleteData(key);

    return deletedTransmission;
  }

  throw new Error("Transmission is not found!");
};
