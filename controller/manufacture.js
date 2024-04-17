const manufactureServices = require("../services/manufacture");

exports.getManufactures = async (req, res, next) => {
  try {
    const data = await manufactureServices.getManufactures();
    res.status(200).json({
      data,
      message: "Manufactures fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getManufacture = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const data = await manufactureServices.getManufacture(id);

    res.status(200).json({
      data,
      message: `Manufactures with id ${id} fetched successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.addManufacture = async (req, res, next) => {
  try {
    const newManufacture = req.body;
    console.log(newManufacture);
    const { name } = newManufacture;

    if (!name || name == "") {
      return res.status(400).json({
        data: null,
        message: "Manufacture name is required",
      });
    }

    const data = await manufactureServices.addManufacture({
      ...newManufacture,
    });
    res.status(200).json({
      data,
      message: "Manufacture added successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateManufacture = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const newManufacture = req.body;
    const { name } = newManufacture;

    if (!name || name == "") {
      return res.status(400).json({
        data: null,
        message: "Manufacture name is required",
      });
    }

    const data = await manufactureServices.updateManufacture(id, {
      ...newManufacture,
    });
    res.status(200).json({
      data,
      message: "Manufacture updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteManufacture = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const data = await manufactureServices.deleteManufacture(id);
    res.status(200).json({
      data,
      message: "Manufacture deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
