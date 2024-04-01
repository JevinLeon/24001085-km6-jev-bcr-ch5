const carServices = require("../services/car");

exports.getCars = async (req, res, next) => {
  try {
    const data = await carServices.getCars();
    res.status(200).json({
      data,
      message: "Cars fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getCar = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const data = await carServices.getCar(id);

    res.status(200).json({
      data,
      message: `Cars with id ${id} fetched successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.addCar = async (req, res, next) => {
  try {
    const newCar = req.body;
    const { photo } = JSON.parse(JSON.stringify(req.files));
    const { name, rentPerDay, size } = newCar;

    if (!name || name == "") {
      return res.status(400).json({
        data: null,
        message: "Car name is required",
      });
    }

    if (!rentPerDay || isNaN(parseInt(rentPerDay)) || rentPerDay <= 0) {
      return res.status(400).json({
        data: null,
        message: "Car rent price must be positive value",
      });
    }

    if (!size || size == "") {
      return res.status(400).json({
        data: null,
        message: "Car size is required",
      });
    }

    const data = await carServices.addCar({ ...newCar, photo });
    res.status(200).json({
      data,
      message: "Car added successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCar = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const { photo } = JSON.parse(JSON.stringify(req.files));

    const newCar = req.body;
    const { name, rentPerDay, size } = newCar;

    if (!name || name == "") {
      return res.status(400).json({
        data: null,
        message: "Car name is required",
      });
    }

    if (!rentPerDay || isNaN(parseInt(rentPerDay)) || rentPerDay <= 0) {
      return res.status(400).json({
        data: null,
        message: "Car rent price must be positive value",
      });
    }

    if (!size || size == "") {
      return res.status(400).json({
        data: null,
        message: "Car size is required",
      });
    }

    const data = await carServices.updateCar(id, { ...newCar, photo });
    res.status(200).json({
      data,
      message: "Car updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const data = await carServices.deleteCar(id);
    res.status(200).json({
      data,
      message: "Car deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
