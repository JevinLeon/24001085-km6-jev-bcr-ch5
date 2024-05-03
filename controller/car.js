const carServices = require("../services/car");
const manufactureServices = require("../services/manufacture");
const typeServices = require("../services/type");
const transmissionServices = require("../services/transmission");

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
    const { image } = JSON.parse(JSON.stringify(req.files));
    const createdBy = req?.user?.id;

    let {
      model,
      plate,
      rentPerDay,
      description,
      capacity,
      availableAt,
      available,
      year,
      options,
      specs,
      manufacture_id,
      type_id,
      transmission_id,
    } = newCar;

    if (!model || model == "") {
      return next({
        statusCode: 404,
        message: "Car model is required",
      });
    }

    if (!plate || plate == "") {
      return next({
        statusCode: 404,

        message: "Car plate is required",
      });
    }

    if (!rentPerDay || isNaN(parseInt(rentPerDay)) || rentPerDay <= 0) {
      return next({
        statusCode: 404,

        message: "Car rent price must be positive value",
      });
    } else {
      rentPerDay = parseInt(rentPerDay);
    }

    if (!description || description == "") {
      return next({
        statusCode: 404,

        message: "Car description is required",
      });
    }

    if (!capacity || isNaN(parseInt(capacity)) || capacity <= 0) {
      return next({
        statusCode: 404,

        message: "Car rent price must be positive value",
      });
    } else {
      capacity = parseInt(capacity);
    }

    if (!availableAt || availableAt == "") {
      return next({
        statusCode: 404,

        message: "Car available schedule is required",
      });
    }

    if (!available || isNaN(parseInt(capacity))) {
      return next({
        statusCode: 404,

        message: "Car availablity is required",
      });
    } else {
      available = parseInt(available) ? true : false;
    }

    if (!year || year == "") {
      return next({
        statusCode: 404,

        message: "Car year is required",
      });
    }
    if (!image) {
      return next({
        statusCode: 404,

        message: "Car image is required",
      });
    }

    if (
      !manufacture_id ||
      isNaN(parseInt(manufacture_id)) ||
      manufacture_id <= 0
    ) {
      return next({
        statusCode: 404,

        message: "Manufacture is required",
      });
    } else {
      manufacture_id = parseInt(manufacture_id);
    }

    const manufactureExist = await manufactureServices.getManufacture(
      parseInt(manufacture_id)
    );

    if (!manufactureExist) {
      return next({
        statusCode: 404,
        message: "Manufacture is not found",
      });
    }

    if (!type_id || isNaN(parseInt(type_id)) || type_id <= 0) {
      return next({
        statusCode: 404,

        message: "Manufacture is required",
      });
    } else {
      type_id = parseInt(type_id);
    }

    const typeExist = await typeServices.getType(parseInt(type_id));

    if (!typeExist) {
      return next({
        statusCode: 404,
        message: "type is not found",
      });
    }

    if (
      !transmission_id ||
      isNaN(parseInt(transmission_id)) ||
      transmission_id <= 0
    ) {
      return next({
        statusCode: 404,

        message: "Manufacture is required",
      });
    } else {
      transmission_id = parseInt(transmission_id);
    }

    const transmissionExist = await transmissionServices.getTransmission(
      parseInt(transmission_id)
    );

    if (!transmissionExist) {
      return next({
        statusCode: 404,
        message: "transmission is not found",
      });
    }

    specs = specs.split(",");
    options = options.split(",");

    const data = await carServices.addCar({
      model,
      plate,
      rentPerDay,
      description,
      capacity,
      availableAt,
      available,
      year,
      options,
      specs,
      manufacture_id,
      type_id,
      transmission_id,
      image,
      createdBy,
    });
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
    const newCar = req.body;
    const id = parseInt(req?.params?.id);
    const updatedBy = req?.user?.id;
    let image;

    if (req.body?.image) {
      image = req.body?.image;
    } else {
      const { image: imageFile } = JSON.parse(JSON.stringify(req.files));
      image = imageFile;
    }
    let {
      model,
      plate,
      rentPerDay,
      description,
      capacity,
      availableAt,
      available,
      year,
      options,
      specs,
      manufacture_id,
      type_id,
      transmission_id,
    } = newCar;

    if (!model || model == "") {
      return next({
        statusCode: 404,
        message: "Car model is required",
      });
    }

    if (!plate || plate == "") {
      return next({
        statusCode: 404,

        message: "Car plate is required",
      });
    }

    if (!rentPerDay || isNaN(parseInt(rentPerDay)) || rentPerDay <= 0) {
      return next({
        statusCode: 404,

        message: "Car rent price must be positive value",
      });
    } else {
      rentPerDay = parseInt(rentPerDay);
    }

    if (!description || description == "") {
      return next({
        statusCode: 404,

        message: "Car description is required",
      });
    }

    if (!capacity || isNaN(parseInt(capacity)) || capacity <= 0) {
      return next({
        statusCode: 404,

        message: "Car rent price must be positive value",
      });
    } else {
      capacity = parseInt(capacity);
    }

    if (!availableAt || availableAt == "") {
      return next({
        statusCode: 404,

        message: "Car available schedule is required",
      });
    }

    if (!available || isNaN(parseInt(capacity))) {
      return next({
        statusCode: 404,

        message: "Car availablity is required",
      });
    } else {
      available = parseInt(available) ? true : false;
    }

    if (!year || year == "") {
      return next({
        statusCode: 404,

        message: "Car year is required",
      });
    }
    if (!image) {
      return next({
        statusCode: 404,

        message: "Car image is required",
      });
    }

    if (
      !manufacture_id ||
      isNaN(parseInt(manufacture_id)) ||
      manufacture_id <= 0
    ) {
      return next({
        statusCode: 404,

        message: "Manufacture is required",
      });
    } else {
      manufacture_id = parseInt(manufacture_id);
    }

    const manufactureExist = await manufactureServices.getManufacture(
      parseInt(manufacture_id)
    );

    if (!manufactureExist) {
      return next({
        statusCode: 404,
        message: "Manufacture is not found",
      });
    }

    if (!type_id || isNaN(parseInt(type_id)) || type_id <= 0) {
      return next({
        statusCode: 404,

        message: "Manufacture is required",
      });
    } else {
      type_id = parseInt(type_id);
    }

    const typeExist = await typeServices.getType(parseInt(type_id));

    if (!typeExist) {
      return next({
        statusCode: 404,
        message: "type is not found",
      });
    }

    if (
      !transmission_id ||
      isNaN(parseInt(transmission_id)) ||
      transmission_id <= 0
    ) {
      return next({
        statusCode: 404,

        message: "Manufacture is required",
      });
    } else {
      transmission_id = parseInt(transmission_id);
    }

    const transmissionExist = await transmissionServices.getTransmission(
      parseInt(transmission_id)
    );

    if (!transmissionExist) {
      return next({
        statusCode: 404,
        message: "transmission is not found",
      });
    }

    specs = specs.split(",");
    options = options.split(",");

    const data = await carServices.updateCar(id, {
      model,
      plate,
      rentPerDay,
      description,
      capacity,
      availableAt,
      available,
      year,
      options,
      specs,
      manufacture_id,
      type_id,
      transmission_id,
      image,
      updatedBy,
    });
    res.status(200).json({
      data,
      message: "Car added successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const deletedBy = req?.user?.id;

    await carServices.updateCar(id, { deletedBy });

    const data = await carServices.deleteCar(id);
    res.status(200).json({
      data,
      message: "Car deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
