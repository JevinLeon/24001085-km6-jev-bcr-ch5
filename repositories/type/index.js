const { Type } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getTypes = async () => {
  const type = await Type.findAll();

  return type;
};

exports.getType = async (id) => {
  const key = `types:${id}`;

  let data = await getData(key);
  if (data) {
    return data;
  }

  const selectedType = await Type.findOne({
    where: {
      id,
    },
  });

  if (selectedType) {
    await setData(key, selectedType, 300);
    return selectedType;
  }

  throw new Error("Type is not found!");
};

exports.addType = async (payload) => {
  const newType = await Type.create({ ...payload });
  const key = `types:${newType.id}`;
  await setData(key, newType, 300);

  return newType;
};

exports.updateType = async (id, payload) => {
  const key = `types:${id}`;
  const selectedType = await Type.findOne({ where: { id } });

  if (selectedType) {
    const updatedType = await selectedType.update({ ...payload });
    await setData(key, updatedType, 300);

    return updatedType;
  }

  throw new Error("Type is not found!");
};

exports.deleteType = async (id) => {
  const key = `types:${id}`;
  const selectedType = await Type.findOne({ where: { id } });

  if (selectedType) {
    const deletedType = await selectedType.destroy();
    await deleteData(key);

    return deletedType;
  }

  throw new Error("Type is not found!");
};
