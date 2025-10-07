// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const cookieParser = require("cookie-parser");
// const path = require("path");

// // Sequelize models (sequelize-cli generated index.js)
// const db = require('./models');
// const router = require('./routes/auth');
// const route = require('./routes/servicesRoute');
// const routes = require('./routes/salonRoute');
// const categoryRouter = require('./routes/categoryRoute');
// const scheduleRouter = require('./routes/scheduleRoute');
// const roleroute = require('./routes/roleRoute');
// const PermissionRouter = require('./routes/permissionRoutes');
// const appointmentRouter = require('./routes/appointmentRoute');
// const inventory = require('./models/inventory');
// const inventoryRouter = require('./routes/inventoryRoute');
// const { sequelize } = db;




// const app = express();

// // Middlewares
// app.use(cors({
//   origin: "http://localhost:3000", // your frontend
//   credentials: true,
// }));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve images
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // API Routes
// app.use('/auth', router);
// app.use('/salon', routes);
// app.use('/services', route);
// app.use('/category',categoryRouter)
// app.use('/schedule',scheduleRouter)
// app.use('/role',roleroute)
// app.use('/permission',PermissionRouter)
// app.use('/appointment',appointmentRouter)
// app.use('/inventory',inventoryRouter)

// // Server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, async () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Database connected');
//   } catch (err) {
//     console.error('❌ DB connection error:', err);
//   }
// });
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require("path");

// Import Sequelize models and DB instance
const db = require('./models');
const { sequelize } = db;

// Import routes
const authRouter = require('./routes/auth');
const serviceRouter = require('./routes/servicesRoute');
const salonRouter = require('./routes/salonRoute');
const categoryRouter = require('./routes/categoryRoute');
const scheduleRouter = require('./routes/scheduleRoute');
const roleRouter = require('./routes/roleRoute');
const permissionRouter = require('./routes/permissionRoutes');
const appointmentRouter = require('./routes/appointmentRoute');
const inventoryRouter = require('./routes/inventoryRoute');

const app = express();

// ============================
// 🔧 Middleware Setup
// ============================
import cors from 'cors';
app.use(cors({
    origin: ["http://localhost:3000", "https://saas-project-salon-management-syste-seven.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));


app.use(cookieParser());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ============================
// 🚏 API Routes
// ============================
app.use('/auth', authRouter);
app.use('/salon', salonRouter);
app.use('/services', serviceRouter);
app.use('/category', categoryRouter);
app.use('/schedule', scheduleRouter);
app.use('/role', roleRouter);
app.use('/permission', permissionRouter);
app.use('/appointment', appointmentRouter);
app.use('/inventory', inventoryRouter);

// ============================
// 🚀 Server Start + DB Check
// ============================
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);

  try {
    // Reinitialize Sequelize with SSL (for Railway)
    const { Sequelize } = require('sequelize');
    const sslSequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    );

    await sslSequelize.authenticate();
    console.log("✅ Database connected successfully (via SSL)");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
});
