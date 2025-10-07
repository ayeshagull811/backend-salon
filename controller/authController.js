const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const Salon = db.Salon;
const UserSalons = db.UserSalons;
const Role = db.Role;
const RolePermissions = db.RolePermissions;
const Permission = db.Permission;

// ✅ Owner Register
const RegisterUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password_hash,
      phonenumber,
      confirmpassword
    } = req.body;

    // ✅ Required fields check
    if (!firstname || !lastname || !email || !password_hash) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Password match check
    if (password_hash !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password_hash, 10);

    // ✅ Find owner role
    const ownerRole = await Role.findOne({ where: { name: "owner" } });
    if (!ownerRole)
      return res.status(500).json({ message: "Owner role not found" });

    // ✅ Create only owner (no salon)
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      phonenumber,
      password_hash: hashedPassword,
      roleId: ownerRole.id
    });

    res.status(201).json({
      message: "Owner created successfully",
      owner: newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Staff/Admin Register
const RegisterStaff = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password_hash,
      confirmpassword,
      phonenumber,
      gender,
      roleId
    } = req.body;

    if (!firstname || !lastname || !email || !password_hash) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password_hash !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password_hash, 10);

    const newStaff = await User.create({
      firstname,
      lastname,
      email,
      phonenumber,
      password_hash: hashedPassword,
      gender,
      roleId: roleId || null
    });

    // Only assign salon if SalonId is provided
    if (req.body.SalonId) {
      await UserSalons.create({
        userId: newStaff.id,
        salonId: req.body.SalonId,
        roleId: roleId || null
      });
    }

    res.status(201).json({ message: "Staff registered successfully", staff: newStaff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to register staff" });
  }
};


// ✅ Login User
// const LoginUser = async (req, res) => {
//   try {
//     const { email, password_hash } = req.body;

//     const existingUser = await User.findOne({
//       where: { email },
//       include: [
//         {
//           model: Salon,
//           as: "Salons",
//           attributes: ["id", "salon_name", "salon_email", "contact_number", "type"],
//           through: { attributes: [] }
//         },
//         {
//           model: Role,
//           as: "Roles",
//           attributes: ["id", "name"],
//           through: { attributes: [] }
//         }
//       ]
//     });

//     if (!existingUser) return res.status(400).json({ message: "Invalid email" });

//     const isMatch = await bcrypt.compare(password_hash, existingUser.password_hash);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const roleIds = existingUser.Roles.map(r => r.id);
//     const rolePermissions = await RolePermissions.findAll({
//       where: { roleId: roleIds },
//       attributes: ["permissionId"]
//     });

//     const permissionIds = rolePermissions.map(rp => rp.permissionId);
//     const permissions = await Permission.findAll({
//       where: { id: permissionIds },
//       attributes: ["name"]
//     });

//     const permissionNames = permissions.map(p => p.name);
//     const roles = existingUser.Roles.map(r => r.name);

//     const token = jwt.sign(
//       { id: existingUser.id, email: existingUser.email, roles, permissions: permissionNames ,salonId: existingUser.salonId },
//       process.env.JWT_SECRET,
//       { expiresIn: "100y" }
//     );

//     res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: existingUser.id,
//         email: existingUser.email,
//         firstname: existingUser.firstname,
//         lastname: existingUser.lastname,
//         salons: existingUser.Salons,
//         roles,
//         permissions: permissionNames
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "server error", error: error.message });
//   }
// };
const LoginUser = async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    const existingUser = await User.findOne({
      where: { email },
      include: [
        {
          model: Salon,
          as: "Salons",
          attributes: ["id", "salon_name", "salon_email", "contact_number", "type"],
          through: { attributes: [] }
        },
        {
          model: Role,
          as: "Roles",
          attributes: ["id", "name"],
          through: { attributes: [] }
        }
      ]
    });

    if (!existingUser) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password_hash, existingUser.password_hash);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const roleIds = existingUser.Roles.map(r => r.id);
    const rolePermissions = await RolePermissions.findAll({
      where: { roleId: roleIds },
      attributes: ["permissionId"]
    });

    const permissionIds = rolePermissions.map(rp => rp.permissionId);
    const permissions = await Permission.findAll({
      where: { id: permissionIds },
      attributes: ["name"]
    });

    const permissionNames = permissions.map(p => p.name);
    const roles = existingUser.Roles.map(r => r.name);

    // ✅ assign salonId properly
    const salonId =
      existingUser.Salons && existingUser.Salons.length > 0
        ? existingUser.Salons[0].id
        : null;

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        roles,
        permissions: permissionNames,
        salonId
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        salons: existingUser.Salons,
        roles,
        permissions: permissionNames,
        salonId
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

// ✅ Get Staff by Salon
const getStaffById = async (req, res) => {
  try {
    const { SalonId } = req.params;
    const id = Number(SalonId);
    if (!id) return res.status(400).json({ success: false, message: "SalonId is required" });

    const staff = await User.findAll({
      include: [{ model: Salon, where: { id } }],
      attributes: { exclude: ["password_hash", "confirmpassword"] },
      order: [["createdAt", "DESC"]]
    });

    if (!staff.length) return res.status(404).json({ success: false, message: "No staff found for this salon" });

    res.json({ success: true, data: staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { RegisterUser, RegisterStaff, LoginUser, getStaffById };
