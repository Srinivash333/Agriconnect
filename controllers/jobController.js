const db = require("../config/db");

// Create Job (POST)
exports.createJob = (req, res) => {
  const { title, description, wage_type, amount } = req.body;

  const sql = "INSERT INTO jobs (title, description, wage_type, amount) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, description, wage_type, amount], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error posting job");
    }

    // 👉 Redirect after success (better UX)
    res.redirect("/jobs");
  });
};


// Get Jobs (GET)
exports.getJobs = (req, res) => {
  // Simple ML logic: prioritize daily jobs
  const sql = "SELECT * FROM jobs ORDER BY wage_type = 'day' DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching jobs");
    }

    res.render("worker/jobs", { jobs: results });
  });
};