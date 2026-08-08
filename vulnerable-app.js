const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: true }));

// A03: Injection - SQL Injection
app.get("/user", (req, res) => {
    const userId = req.query.id;

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "demo-password",
        database: "users"
    });

    const query = "SELECT * FROM users WHERE id = " + userId;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send("Database error");
        }

        res.json(results);
    });
});

// A03: Injection - Command Injection
app.get("/ping", (req, res) => {
    const host = req.query.host;

    exec("ping -c 1 " + host, (error, stdout) => {
        if (error) {
            return res.status(500).send("Command failed");
        }

        res.send(stdout);
    });
});

// A01: Broken Access Control
app.get("/admin", (req, res) => {
    const user = req.query.user;

    if (user) {
        res.json({
            role: "admin",
            secretData: "demo-admin-data"
        });
    }
});

// A01: Path Traversal
app.get("/file", (req, res) => {
    const filename = req.query.file;

    const content = fs.readFileSync("./uploads/" + filename, "utf8");

    res.send(content);
});

// A03: XSS
app.get("/hello", (req, res) => {
    const name = req.query.name;

    res.send("<html><body>Hello " + name + "</body></html>");
});

app.listen(3000);
