 const db = require("../models");
const Salon = db.Salon;
const User = db.User;
const getAllSalons = async (req, res) => {
  try {
    const salons = await Salon.findAll({
      include: [{ model: User, as: "Users", through: { attributes: ["roleId"] } }],
    });
    res.status(200).json({
      message: "get all salons",
      data: salons,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching salons", error: error.message });
  }
};

// const createSalon = async (req, res) => {
//   try {
//     const userId = req.user.id; 
//      const role = await db.Role.findOne({ where: { name: "owner" } });
//        if (req.user.roleId !== role.id) {
//       return res.status(403).json({ message: "No permission to create salon" });
//     }
//     const { salon_name, salon_email, contact_number, type } = req.body;

//     // Salon create karo
//     const newSalon = await Salon.create({
//       salon_name,
//       salon_email,
//       contact_number,
//       type,
//       userId,
//     });

//     // User find karo
//     const user = await User.findByPk(userId);
// if (user) {
//   await db.UserSalons.create({
//     userId,
//       salonId: newSalon.id,
//       roleId: role.id,
//   })
// }
// console.log("Decoded User from Token:", req.user);

//     res.status(201).json({
//       message: "Salon created successfully",
//       salonId: newSalon.id,
//       data: newSalon,
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

const createSalon = async (req, res) => {
  try {
    // Token se aaya user check karo
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found in token" });
    }

    const userId = req.user.id;
    console.log("Decoded User from Token:", req.user);

    // Role fetch karo (case-sensitive fix ✅)
    const ownerRole = await db.Role.findOne({ where: { name: "owner" } });
    if (!ownerRole) {
      return res.status(404).json({ message: "Owner role not found in Roles table" });
    }

    // Salon create karo
    const { salon_name, salon_email, contact_number, type } = req.body;
    const newSalon = await db.Salon.create({
      salon_name,
      salon_email,
      contact_number,
      type,
    });

    // User ko salon ka owner bana do
    await db.UserSalons.create({
      userId,
      salonId: newSalon.id,
      roleId: ownerRole.id,
    });

    res.status(201).json({
      message: "Salon created successfully",
      salonId: newSalon.id,
      data: newSalon,
    });
  } catch (error) {
    console.error("Create Salon Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const addSalonById = async (req, res) => {
  const { salonId } = req.params;
  const { userId, role } = req.body;

  try {
    const salon = await Salon.findByPk(salonId);


    if (!salon ) {
      return res.status(404).json({ message: " Salon not found" });
    }
   const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const roleRecord = await db.Role.findOne({ where: { name: role } });
if (!roleRecord) {
  return res.status(404).json({ message: "Role not found" });
}

await db.UserSalons.create({
  userId: user.id,
  salonId: salon.id,
  roleId: roleRecord.id
});


    res.json({ message: "User added to salon successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// backend
const getSalonById = async (req, res) => {
  try {
    const userId = req.user.id; // token se user

    const user = await User.findByPk(userId, {
      include: {
        model: db.Salon,
        as: "Salons", // 👈 alias add kiya
        attributes: ["id", "salon_name", "salon_email", "contact_number", "type"],
        through: { attributes: ["roleId"] },
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.Salons || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSalon = async (req, res) => {
  try {
    const { id } = req.params;
    const { salon_name, salon_email, contact_number, country, type } = req.body;

    const salon = await Salon.findByPk(id);
    if (!salon) return res.status(404).json({ message: "Salon not found" });

    salon.salon_name = salon_name || salon.salon_name;
    salon.salon_email = salon_email || salon.salon_email;
    salon.contact_number = contact_number || salon.contact_number;
    salon.country = country || salon.country;
    salon.type = type || salon.type;

    await salon.save();

    res.json({ message: "Salon updated successfully", data: salon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSalon = async (req, res) => {
  try {
    const { id } = req.params;
    const salon = await Salon.findByPk(id);

    if (!salon) return res.status(404).json({ message: "Salon not found" });

    await salon.destroy();
    res.json({ message: "Salon deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalonDetails = async (req, res) => {
  try {
    const { salonId } = req.params;
    const userId = req.user.id; // token se
    const salon = await Salon.findByPk(salonId, {
      include: [{
        model: User,
        attributes: ['id', 'firstname', 'lastname', 'email'],
       through: { attributes: ['roleId'] },
        where: { id: userId }, // ensure membership
        required: false
      }]
    });

    if (!salon) return res.status(404).json({ message: 'Salon not found' });

    // agar relation nahi mila to deny
    const isMember = salon.Users && salon.Users.length > 0;
    if (!isMember) return res.status(403).json({ message: 'Not allowed' });

    res.json(salon);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};



module.exports = { getAllSalons, createSalon ,addSalonById,getSalonById , updateSalon ,deleteSalon ,getSalonDetails};