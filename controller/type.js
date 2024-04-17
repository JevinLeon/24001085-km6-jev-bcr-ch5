const typeServices = require("../services/type");

exports.getTypes = async (req, res, next) => {
  try {
    const data = await typeServices.getTypes();
    res.status(200).json({
      data,
      message: "Types fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getType = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const data = await typeServices.getType(id);

    res.status(200).json({
      data,
      message: `Types with id ${id} fetched successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.addType = async (req, res, next) => {
  try {
    const newType = req.body;
    const { name } = newType;

    if (!name || name == "") {
      return res.status(400).json({
        data: null,
        message: "Type name is required",
      });
    }

    const data = await typeServices.addType({
      ...newType,
    });
    res.status(200).json({
      data,
      message: "Type added successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateType = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const newType = req.body;
    const { name } = newType;

    if (!name || name == "") {
      return res.status(400).json({
        data: null,
        message: "Type name is required",
      });
    }

    const data = await typeServices.updateType(id, {
      ...newType,
    });
    res.status(200).json({
      data,
      message: "Type updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteType = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const data = await typeServices.deleteType(id);
    res.status(200).json({
      data,
      message: "Type deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
