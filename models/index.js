require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const basename = path.basename(__filename);
const db = {};

// ✅ Railway MySQL connection with SSL enabled
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000, // prevent ETIMEDOUT error
      ssl: {
        require: true,
        rejectUnauthorized: false, // Railway uses self-signed certs
      },
    },
  }
);

// ✅ Dynamically import all models in current folder
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      !file.endsWith('.test.js')
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// ✅ Set up model associations (if any)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
