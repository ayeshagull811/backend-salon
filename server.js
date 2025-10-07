require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require("path");

const db = require('./models');
const { sequelize } = db;

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
// 🔧 CORS (Top, before body parsers)
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://saas-project-salon-management-syste-seven.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ============================
// Parsers
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ============================
// Routes
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
// Server + DB check
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
    console.log(`✅ Server running on port ${PORT}`);

    try {
        // Use the existing Sequelize instance from ./models
        await sequelize.authenticate();
        console.log("✅ Database connected successfully (via SSL)");
    } catch (err) {
        console.error("❌ DB connection error:", err);
    }
});
