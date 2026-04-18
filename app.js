const express = require("express");
const path = require("path");

const app = express();

// Controllers
const jobController = require("./controllers/jobController");
const authController = require("./controllers/authController");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

// ---------------- Farmer Routes ----------------

// Farmer Dashboard
app.get("/farmer/dashboard", (req, res) => {
  res.render("farmer/dashboard");
});

// Show Post Job Form
app.get("/post-job", (req, res) => {
  res.render("farmer/post-job");
});

// Post Job
app.post("/post-job", jobController.createJob);

// ✅ Show Available Workers (Farmer)
app.get("/workers", authController.getAvailableWorkers);

// ---------------- Worker Routes ----------------

// Worker Dashboard
app.get("/worker/dashboard", (req, res) => {
  res.render("worker/dashboard");
});

// Dynamic Jobs
app.get("/jobs", jobController.getJobs);

// Toggle Availability
app.post("/toggle-availability", authController.toggleAvailability);

// ---------------- Test Route ----------------

app.get("/", (req, res) => {
  res.send("Agriconnect server is Running");
});

module.exports = app;