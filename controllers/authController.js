const db = require("../config/db");

// Show Signup Page
exports.showSignup = (req, res) => {
  res.render("auth/signup");
};

// Show Login Page
exports.showLogin = (req, res) => {
  res.render("auth/login");
};

// SIGNUP (Store in MySQL)
exports.signupUser = (req, res) => {
  const { name, email, password, role } = req.body;

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error in signup");
    }

    res.send("Signup successful! Go to login.");
  });
};

// LOGIN (Check from MySQL)
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error in login");
    }

    if (results.length === 0) {
      return res.send("Invalid credentials. Please try again.");
    }

    const user = results[0];

    // Role-based redirect
    if (user.role === "farmer") {
      res.redirect("/farmer/dashboard");
    } else {
      res.redirect("/worker/dashboard");
    }
  });
};

// TOGGLE AVAILABILITY
exports.toggleAvailability = (req, res) => {
  // Temporary: fixed user id (later use session)
  const userId = 1;

  const sql = "UPDATE users SET availability = NOT availability WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error updating availability");
    }

    res.redirect("/worker/dashboard");
  });
};

// GET AVAILABLE WORKERS (for Farmer)
exports.getAvailableWorkers = (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'worker' AND availability = TRUE";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching workers");
    }

    res.render("farmer/workers", { workers: results });
  });
};


