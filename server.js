const query = "SELECT * FROM users WHERE username = ?";
db.query(query, [username], (err, results) => {