const express = require("express");
const roleroute = express.Router();
const { createRole, getRoles, getRole, updateRole, deleteRole } = require("../controller/roleController");

// CRUD
roleroute.post("/createrole", createRole);
roleroute.get("/getrole", getRoles);
roleroute.get("/getrole/:id", getRole);
roleroute.put("/updaterole/:id", updateRole);
roleroute.delete("/deleterole/:id", deleteRole);

module.exports = roleroute;
