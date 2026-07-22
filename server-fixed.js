// DEMO-VULN-APP — PATCHED version. Compare against ../server.js.
// Each fix below is tagged with the [VULN-xx] id it resolves.

const express = require("express");
const mysql = require("mysql");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const csrf = require("csurf");
const { Resolver } = require("dns").promises;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(csrf({ cookie: true })); // [FIX-09] CSRF protection restored

// [FIX-01] Credentials pulled from environment, never hardcoded
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// [FIX-01b] Secret loaded from env, must be a strong random value in practice
const JWT_SECRET = process.env.JWT_SECRET;

// [FIX-02] Parameterized query — no string concatenation of user input
app.get("/user", (req, res) => {
  const username = req.query.username;
  db.query(
    "SELECT id, username, created_at FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).send("DB error");
      res.json(results);
    }
  );
});

// [FIX-03] No shell invocation — allow-listed hosts only, DNS lookup instead of exec
const ALLOWED_HOSTS = new Set(["localhost", "127.0.0.1"]);
app.get("/ping", async (req, res) => {
  const host = req.query.host;
  if (!ALLOWED_HOSTS.has(host)) {
    return res.status(400).send("host not permitted");
  }
  try {
    const resolver = new Resolver();
    const addrs = await resolver.resolve4(host);
    res.json({ host, addrs });
  } catch {
    res.status(500).send("resolution failed");
  }
});

// [FIX-04] Output encoded before being placed in HTML (no raw interpolation)
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
app.get("/greet", (req, res) => {
  const name = req.query.name || "guest";
  res.send("<h1>Hello, " + escapeHtml(name) + "!</h1>");
});

// [FIX-05] Strong, salted password hashing (scrypt) instead of MD5
function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return salt.toString("hex") + ":" + hash.toString("hex");
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

// [FIX-06] Signature verified with a fixed algorithm allow-list
app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    res.json({ user: decoded });
  } catch {
    res.status(401).send("invalid token");
  }
});

// [FIX-07] Filename resolved and validated to stay within the uploads directory
app.get("/download", (req, res) => {
  const uploadsDir = path.join(__dirname, "uploads");
  const requested = path.normalize(req.query.file || "");
  const filePath = path.join(uploadsDir, requested);
  if (!filePath.startsWith(uploadsDir + path.sep)) {
    return res.status(400).send("invalid path");
  }
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(404).send("not found");
    res.send(data);
  });
});

// [FIX-08] eval() removed entirely — safe arithmetic-only evaluator
app.post("/calculate", (req, res) => {
  const expression = req.body.expression || "";
  if (!/^[\d\s+\-*/().]+$/.test(expression)) {
    return res.status(400).json({ error: "only numeric expressions allowed" });
  }
  // Still avoids eval(): tiny recursive-descent evaluator would go here in production.
  // For demo purposes we reject anything beyond a single numeric literal.
  const result = Number(expression);
  if (Number.isNaN(result)) return res.status(400).json({ error: "invalid expression" });
  res.json({ result });
});

// [FIX-09] Transfer endpoint now covered by global csrf() middleware above,
// plus require an authenticated session (left as an exercise for full app).
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

// [FIX-10] CORS locked to an explicit allow-list, credentials only for those origins
const ALLOWED_ORIGINS = new Set(["https://app.example.com"]);
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
});

app.listen(3000, () => console.log("demo-vuln-app (patched) listening on 3000"));
