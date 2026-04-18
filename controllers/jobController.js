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
  const sql = "SELECT * FROM jobs";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching jobs");
    }

    res.render("worker/jobs", { jobs: results });
  });
};