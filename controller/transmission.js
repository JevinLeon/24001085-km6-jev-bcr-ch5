const transmissionServices = require("../services/transmission");

exports.getTransmissions = async (req, res, next) => {
  try {
    const data = await transmissionServices.getTransmissions();
    res.status(200).json({
      data,
      message: "Transmissions fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getTransmission = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);

    const data = await transmissionServices.getTransmission(id);

    res.status(200).json({
      data,
      message: `Transmissions with id ${id} fetched successfully`,
    });
  } catch (err) {
    next(err);
  }
};

exports.addTransmission = async (req, res, next) => {
  try {
    const newTransmission = req.body;
    const createdBy = req?.user?.id;
    const { name } = newTransmission;

    if (!name || name == "") {
      return res.status(400).json({
        data: null,
        message: "Transmission name is required",
      });
    }

    const data = await transmissionServices.addTransmission({
      ...newTransmission,
      createdBy,
    });
    res.status(200).json({
      data,
      message: "Transmission added successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTransmission = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const updatedBy = req?.user?.id;
    const newTransmission = req.body;
    const { name } = newTransmission;

    if (!name || name == "") {
      return res.status(400).json({
        data: null,
        message: "Transmission name is required",
      });
    }

    const data = await transmissionServices.updateTransmission(id, {
      ...newTransmission,
      updatedBy,
    });
    res.status(200).json({
      data,
      message: "Transmission updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTransmission = async (req, res, next) => {
  try {
    const id = parseInt(req?.params?.id);
    const deletedBy = req?.user?.id;

    await transmissionServices.updateTransmission(id, { deletedBy });

    const data = await transmissionServices.deleteTransmission(id);
    res.status(200).json({
      data,
      message: "Transmission deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
