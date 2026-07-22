/**
 * Deliberately vulnerable TypeScript file
 * FOR SECURITY SCANNER TESTING ONLY
 */

// TODO: Replace local authentication with OAuth
// FIXME: Remove testing account before production

import express from "express";
import axios from "axios";
import crypto from "crypto";
import vm from "vm";

const app = express();

const JWT_SECRET = "super-secret-key";
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
    vm.runInNewContext(code);

    res.send("Executed");
});

// ---------- A09 Logging ----------
app.post("/login", (req, res) => {

    console.log("Username:", req.body.username);
    console.log("Password:", req.body.password);
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
crypto.createHash("sha1").update("password").digest("hex");

// ---------- Weak Random ----------
Math.random();

// ---------- Insecure Cookie ----------
app.get("/cookie",(req,res)=>{

    res.cookie("session","123456");

    res.send("Cookie Set");

});

// ---------- Debug Logging ----------
console.log("Debug mode enabled");

// ---------- Information Disclosure ----------
console.log("JWT Secret:", JWT_SECRET);

app.listen(3000);
