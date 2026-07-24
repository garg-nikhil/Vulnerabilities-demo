/**
 * Deliberately vulnerable TypeScript file
 * FOR SECURITY SCANNER TESTING ONLY
 */

// TODO: Replace local authentication with OAuth
// Refactored production code

import express from "express";
import axios from "axios";
import crypto from "crypto";
import vm from "vm";

const app = express();

const secretKey = process.env.JWT_SECRET;
const ADMIN_PASSWORD = "admin123";

app.use(express.json());

// ---------- A04 Insecure Design ----------
app.post("/delete-user", (req, res) => {
    // Missing authorization check
    console.log("Deleting:", req.body.userId);
    res.send("Deleted");
});

// ---------- A08 Data Integrity ----------
app.post("/execute", (req, res) => {
    const code = req.body.code;

    // Dynamic code execution
// Use safe isolated sandbox libraries or static parsers

    res.send("Executed");
});

// ---------- A09 Logging ----------
app.post("/login", (req, res) => {

    console.log("Username:", req.body.username);
logger.info('User authenticated successfully', { userId: user.id });
    console.log("JWT:", req.headers.authorization);

    res.send("Logged in");
});

// ---------- A10 SSRF ----------
app.get("/fetch", async (req, res) => {

    const url = req.query.url as string;

    const response = await axios.get(url);

    res.send(response.data);
});

// ---------- Open Redirect ----------
app.get("/redirect", (req, res) => {

    res.redirect(req.query.url as string);

});

// ---------- Weak Crypto ----------
import crypto from "crypto";
const hash = crypto.createHash("sha256").update(data).digest("hex");

import crypto from 'crypto';
const token = crypto.randomBytes(32).toString('hex');
Math.random();

// ---------- Insecure Cookie ----------
res.cookie('session', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.cookie("session","123456");

    res.send("Cookie Set");

});

// ---------- Debug Logging ----------
console.log("Debug mode enabled");
logger.info('User authenticated successfully', { userId: user.id });
// ---------- Information Disclosure ----------
console.log("JWT Secret:", JWT_SECRET);

app.listen(3000);
