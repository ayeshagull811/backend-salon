
const db = require("../models"); // Sequelize models
const { Service } = db;
const { Salon } = db;


const createService = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      currency,
      discount,
      duration,
      employee,
      status,
      tags,
      SalonId,   // salon ka id bhi le rahe hain
      features,  // array direct aa raha hai
    } = req.body;
const featuresArray = JSON.parse(features || "[]");

    // image path
    const filename = req.file?.filename || null;
    const image = filename ? `/uploads/${filename}` : null;

    // normalize values
    const statusBool = String(status).toLowerCase() === "true";

    const service = await Service.create({
      name: req.body.name,
  category: req.body.category,
  description: req.body.description,
  price: parseInt(req.body.price, 10) || 0,
  currency: req.body.currency || "PKR",
  discount: req.body.discount,
  duration: req.body.duration,
  employee: req.body.employee,
  status: String(req.body.status).toLowerCase() === "true",
  tags: req.body.tags,
  image: req.file ? `/uploads/${req.file.filename}` : null,
  features: featuresArray,
  SalonId: req.body.SalonId,
    });
console.log("BODY:", req.body);
console.log("FILE:", req.file);


    res.json({ success: true, data: service });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

const getServices = async (req, res) => {
  try {
    const { SalonId } = req.params;

    if (!SalonId) {
      return res.status(400).json({ success: false, message: "SalonId is required" });
    }

    const services = await Service.findAll({
      where: { SalonId }
    });

    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Not found" });

    const {
      name,
      category,
      description,
      price,
      currency,
      discount,
      duration,
      employee,
      status,
      tags,
      features,
    } = req.body;

    const filename = req.file?.filename || null;
    const image = filename ? `/uploads/${filename}` : service.image;

    const statusBool = String(status).toLowerCase() === "true";
    const featuresJson = features ? JSON.parse(features) : [];

    await service.update({
      name,
      category,
      description,
      price: price ?? 0,
      currency: currency || "PKR",
      discount: discount ?? 0,
      duration,
      employee,
      status: statusBool,
      tags,
      image,
      features: featuresJson,
    });

    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Not found" });

    await service.destroy();
    res.json({ success: true, message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createService,
  getServices,
  updateService,
  deleteService,
};
