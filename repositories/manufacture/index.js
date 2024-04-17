const { Manufacture } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getManufactures = async () => {
  const manufactures = await Manufacture.findAll();

  return manufactures;
};

exports.getManufacture = async (id) => {
  const key = `manufactures:${id}`;

  let data = await getData(key);
  if (data) {
    return data;
  }

  const selectedManufacture = await Manufacture.findOne({
    where: {
      id,
    },
  });

  if (selectedManufacture) {
    await setData(key, selectedManufacture, 300);
    return selectedManufacture;
  }

  throw new Error("Manufacture is not found!");
};

exports.addManufacture = async (payload) => {
  const newManufacture = await Manufacture.create({ ...payload });
  const key = `manufactures:${newManufacture.id}`;
  await setData(key, newManufacture, 300);

  return newManufacture;
};

exports.updateManufacture = async (id, payload) => {
  const key = `manufactures:${id}`;
  const selectedManufacture = await Manufacture.findOne({ where: { id } });

  if (selectedManufacture) {
    const updatedManufacture = await selectedManufacture.update({ ...payload });
    await setData(key, updatedManufacture, 300);

    return updatedManufacture;
  }

  throw new Error("Manufacture is not found!");
};

exports.deleteManufacture = async (id) => {
  const key = `manufactures:${id}`;
  const selectedManufacture = await Manufacture.findOne({ where: { id } });

  if (selectedManufacture) {
    const deletedManufacture = await selectedManufacture.destroy();
    await deleteData(key);

    return deletedManufacture;
  }

  throw new Error("Manufacture is not found!");
};
