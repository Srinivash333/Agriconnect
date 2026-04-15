const db = require("../config/db");

exports.createJob = (req, res) => {
  const { title, description, wage_type, amount } = req.body;

  const sql = "INSERT INTO jobs (title, description, wage_type, amount) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, description, wage_type, amount], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error posting job");
    }

    res.send("Job posted successfully!");
  });
};