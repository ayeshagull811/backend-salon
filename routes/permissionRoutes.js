const express = require("express");
const { createPermission, getPermissions, getPermission, updatePermission, deletePermission } = require("../controller/permissionController");
const PermissionRouter = express.Router();


// CRUD routes
PermissionRouter.post("/create", createPermission);
PermissionRouter.get("/get", getPermissions);
PermissionRouter.get("/getbyid/:id", getPermission);
PermissionRouter.put("/update/:id", updatePermission);
PermissionRouter.delete("/delete/:id", deletePermission);

module.exports = PermissionRouter;
