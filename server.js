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
app.get("/ping", (req, res) => {
  const host = req.query.host;
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
  const host = req.query.host;
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
    res.send(stdout || "error");
  });
});
// [VULN-06] CWE-347 / CWE-347 JWT signature not verified (alg: none accepted)
app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access token missing" });
  }
  try {
// [VULN-07] CWE-22 Path Traversal — user-controlled filename passed to fs.readFile
app.get("/download", (req, res) => {
  const filename = req.query.file;
  if (!filename || typeof filename !== "string") {
    return res.status(400).send("invalid filename");
  }
  const baseDir = path.resolve(__dirname, "uploads");
  const filePath = path.resolve(baseDir, filename);
  if (!filePath.startsWith(baseDir + path.sep)) {
    return res.status(403).send("access denied");
  }
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(404).send("not found");
    res.send(data);
app.post("/transfer", (req, res) => {
  const csrfToken = req.headers["x-csrf-token"] || req.body._csrf;
  if (!csrfToken || typeof csrfToken !== "string") {
    return res.status(403).send("CSRF token missing or invalid");
  }
  const { toAccount, amount } = req.body;
  db.query(
    "UPDATE accounts SET balance = balance - ? WHERE id = ?",
    [amount, toAccount],
    (err) => {
      if (err) return res.status(500).send("DB error");
// Restrict CORS to explicit allowlist
const allowedOrigins = ["https://trusted.example.com", "https://app.example.com"];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
});
    }
  );
});
});
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
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
  res.json({ user: decoded });
// [VULN-08] CWE-94 Insecure use of eval() on user-controlled input
app.post("/calculate", (req, res) => {
  const expression = req.body.expression;
  const safeCalculate = (exprStr) => {
    if (typeof exprStr !== "string" || !/^[0-9+\-*/().\s]+$/.test(exprStr)) {
      return null;
    }
    try {
      const tokens = exprStr.match(/\d+(\.\d+)?|[+\-*/()]/g) || [];
      if (tokens.join("") !== exprStr.replace(/\s+/g, "")) return null;
      let i = 0;
      const parseExpr = () => {
        let val = parseTerm();
        while (tokens[i] === "+" || tokens[i] === "-") {
          const op = tokens[i++];
          val = op === "+" ? val + parseTerm() : val - parseTerm();
        }
        return val;
      };
      const parseTerm = () => {
        let val = parseFactor();
        while (tokens[i] === "*" || tokens[i] === "/") {
          const op = tokens[i++];
          val = op === "*" ? val * parseFactor() : val / parseFactor();
        }
        return val;
      };
      const parseFactor = () => {
        if (tokens[i] === "(") {
          i++;
          const val = parseExpr();
          if (tokens[i++] !== ")") throw new Error();
          return val;
        }
        const num = Number(tokens[i++]);
        if (Number.isNaN(num)) throw new Error();
        return num;
      };
      const result = parseExpr();
      return i === tokens.length ? result : null;
    } catch {
      return null;
    }
  };

  const result = safeCalculate(expression);
  if (result === null || Number.isNaN(result)) {
    return res.status(400).json({ error: "Invalid or unsupported mathematical expression" });
  }
  res.json({ result });
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
