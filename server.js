// DEMO-VULN-APP — intentionally vulnerable Express server for scanner testing.
// Every bug below is tagged [VULN-xx] and listed with its expected CWE in README.md.
// DO NOT deploy this file anywhere reachable from the internet.

const express = require("express");
const mysql = require("mysql");
const { exec } = require("child_process");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SuperSecretPass123", // [VULN-01] CWE-798 Hardcoded credentials
  database: "demo_app",
});

const JWT_SECRET = "changeme"; // [VULN-01b] CWE-798 Hardcoded secret, weak value

// [VULN-02] CWE-89 SQL Injection — user input concatenated directly into query
app.get("/user", (req, res) => {
  const username = req.query.username;
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("DB error");
    res.json(results);
  });
});

// [VULN-03] CWE-78 OS Command Injection — user input passed to a shell
app.get("/ping", (req, res) => {
  const host = req.query.host;
  exec("ping -c 1 " + host, (err, stdout) => {
    res.send(stdout || "error");
  });
});

// [VULN-04] CWE-79 Reflected XSS — user input echoed into HTML without encoding
app.get("/greet", (req, res) => {
  const name = req.query.name || "guest";
  res.send("<h1>Hello, " + name + "!</h1>");
});

// [VULN-05] CWE-327 Use of a broken/weak hash for password storage
function hashPassword(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

app.post("/register", (req, res) => {
  const hashed = hashPassword(req.body.password);
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [req.body.username, hashed],
    (err) => {
      if (err) return res.status(500).send("DB error");
      res.send("registered");
    }
  );
});

// [VULN-06] CWE-347 / CWE-347 JWT signature not verified (alg: none accepted)
app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.decode(token); // decode() does NOT verify the signature
  res.json({ user: decoded });
});

// [VULN-07] CWE-22 Path Traversal — user-controlled filename passed to fs.readFile
app.get("/download", (req, res) => {
  const filename = req.query.file;
  const filePath = path.join(__dirname, "uploads", filename);
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(404).send("not found");
    res.send(data);
  });
});

// [VULN-08] CWE-94 Insecure use of eval() on user-controlled input
app.post("/calculate", (req, res) => {
  const expression = req.body.expression;
  const result = eval(expression);
  res.json({ result });
});

// [VULN-09] CWE-352 No CSRF protection on a state-changing endpoint
app.post("/transfer", (req, res) => {
  const { toAccount, amount } = req.body;
  db.query(
    "UPDATE accounts SET balance = balance - ? WHERE id = ?",
    [amount, toAccount],
    (err) => {
      if (err) return res.status(500).send("DB error");
      res.send("transferred");
    }
  );
// DEMO-VULN-APP — intentionally vulnerable Express server for scanner testing.
// Every bug below is tagged [VULN-xx] and listed with its expected CWE in README.md.
// DO NOT deploy this file anywhere reachable from the internet.

const express = require("express");
const mysql = require("mysql");
const { exec } = require("child_process");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SuperSecretPass123", // [VULN-01] CWE-798 Hardcoded credentials
  database: "demo_app",
});

const JWT_SECRET = process.env.JWT_SECRET;

// [VULN-02] CWE-89 SQL Injection — user input concatenated directly into query
app.get("/user", (req, res) => {
  const username = req.query.username;
app.get("/user", (req, res) => {
  const username = req.query.username;
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send("DB error");
    res.json(results);
  });
});
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("DB error");
// [VULN-03] CWE-78 OS Command Injection — user input passed to a shell
app.get("/ping", (req, res) => {
  const host = String(req.query.host || "");
  const { execFile } = require("child_process");
  execFile("ping", ["-c", "1", host], (err, stdout) => {
    res.send(stdout || "error");
  });
});
// [VULN-04] CWE-79 Reflected XSS — user input echoed into HTML without encoding
app.get("/greet", (req, res) => {
  const name = String(req.query.name || "guest")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  res.send("<h1>Hello, " + name + "!</h1>");
});
});

// [VULN-03] CWE-78 OS Command Injection — user input passed to a shell
app.get("/ping", (req, res) => {
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
  exec("ping -c 1 " + host, (err, stdout) => {
    res.send(stdout || "error");
  });
});
app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json(decoded);
  } catch (err) {
// [VULN-07] CWE-22 Path Traversal — user-controlled filename passed to fs.readFile
app.get("/download", (req, res) => {
  const filename = req.query.file;
  if (!filename || typeof filename !== "string") {
    return res.status(400).send("invalid filename");
  }
  const safeFilename = path.basename(filename);
  const uploadsDir = path.resolve(__dirname, "uploads");
  const filePath = path.resolve(uploadsDir, safeFilename);

  if (!filePath.startsWith(uploadsDir)) {
    return res.status(403).send("access denied");
  }

  fs.readFile(filePath, (err, data) => {
// [VULN-09] CWE-352 No CSRF protection on a state-changing endpoint
app.post("/transfer", (req, res) => {
  const csrfToken = req.headers["x-csrf-token"] || req.body._csrf;
  const expectedToken = req.session?.csrfToken;
  if (!csrfToken || (expectedToken && csrfToken !== expectedToken)) {
    return res.status(403).send("Forbidden: Invalid CSRF token");
  }
  const { toAccount, amount } = req.body;
  db.query(
    "UPDATE accounts SET balance = balance - ? WHERE id = ?",
    [amount, toAccount],
    (err) => {
const allowedOrigins = ["https://example.com"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
});
      res.send("transferred");
    }
  );
});
    res.send(data);
  });
});
  }
});
// [VULN-04] CWE-79 Reflected XSS — user input echoed into HTML without encoding
app.get("/greet", (req, res) => {
  const name = req.query.name || "guest";
  res.send("<h1>Hello, " + name + "!</h1>");
});

// [VULN-05] CWE-327 Use of a broken/weak hash for password storage
function hashPassword(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

app.post("/register", (req, res) => {
  const hashed = hashPassword(req.body.password);
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [req.body.username, hashed],
    (err) => {
      if (err) return res.status(500).send("DB error");
      res.send("registered");
    }
  );
});

// [VULN-06] CWE-347 / CWE-347 JWT signature not verified (alg: none accepted)
app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.decode(token); // decode() does NOT verify the signature
function safeEvaluate(expr) {
  if (typeof expr !== "string" || !/^[0-9+\-*/%().\s]+$/.test(expr)) {
    throw new Error("Invalid input");
  }
  const tokens = expr.match(/\d+(?:\.\d+)?|[+\-*/%()]/g);
  if (!tokens) throw new Error("Invalid input");
  let index = 0;

  function parsePrimary() {
    if (index >= tokens.length) throw new Error("Unexpected end");
    const token = tokens[index++];
    if (token === "(") {
      const val = parseExpression();
      if (tokens[index++] !== ")") throw new Error("Missing closing parenthesis");
      return val;
    }
    if (token === "-") return -parsePrimary();
    if (token === "+") return parsePrimary();
    const num = Number(token);
    if (isNaN(num)) throw new Error("Invalid number");
    return num;
  }

  function parseMultiplicative() {
    let left = parsePrimary();
    while (index < tokens.length) {
      const op = tokens[index];
      if (op === "*" || op === "/" || op === "%") {
        index++;
        const right = parsePrimary();
        if (op === "*") left *= right;
        else if (op === "/") {
          if (right === 0) throw new Error("Division by zero");
          left /= right;
        }
        else if (op === "%") {
          if (right === 0) throw new Error("Division by zero");
          left %= right;
        }
      } else {
        break;
      }
    }
    return left;
  }

  function parseExpression() {
    let left = parseMultiplicative();
    while (index < tokens.length) {
      const op = tokens[index];
      if (op === "+" || op === "-") {
        index++;
        const right = parseMultiplicative();
        if (op === "+") left += right;
        else if (op === "-") left -= right;
      } else {
        break;
      }
    }
    return left;
  }

  const result = parseExpression();
  if (index < tokens.length) throw new Error("Unexpected trailing tokens");
  return result;
}

// [VULN-08] CWE-94 Insecure use of eval() on user-controlled input
app.post("/calculate", (req, res) => {
  const expression = req.body.expression;
  try {
    const result = safeEvaluate(expression);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: "Invalid math expression" });
  }
});
});

// [VULN-07] CWE-22 Path Traversal — user-controlled filename passed to fs.readFile
app.get("/download", (req, res) => {
  const filename = req.query.file;
  const filePath = path.join(__dirname, "uploads", filename);
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(404).send("not found");
    res.send(data);
  });
});

// [VULN-08] CWE-94 Insecure use of eval() on user-controlled input
app.post("/calculate", (req, res) => {
  const expression = req.body.expression;
  const result = eval(expression);
  res.json({ result });
});

// [VULN-09] CWE-352 No CSRF protection on a state-changing endpoint
app.post("/transfer", (req, res) => {
  const { toAccount, amount } = req.body;
  db.query(
    "UPDATE accounts SET balance = balance - ? WHERE id = ?",
    [amount, toAccount],
    (err) => {
      if (err) return res.status(500).send("DB error");
      res.send("transferred");
    }
  );
});

// [VULN-10] CWE-942 Overly permissive CORS (reflects origin + allows credentials)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.listen(3000, () => console.log("demo-vuln-app listening on 3000"));


// [VULN-10] CWE-942 Overly permissive CORS (reflects origin + allows credentials)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.listen(3000, () => console.log("demo-vuln-app listening on 3000"));
