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

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_PASSWORD = "admin123";

app.use(express.json());

// ---------- A04 Insecure Design ----------
// ---------- A04 Insecure Design ----------
app.post("/delete-user", (req, res) => {
    const authHeader = req.headers.authorization;
    const userRole = req.headers["x-user-role"];

    if (!authHeader || userRole !== "admin") {
        return res.status(403).send("Forbidden: Insufficient permissions");
    }

    if (!req.body || typeof req.body.userId !== "string") {
        return res.status(400).send("Bad Request: Invalid or missing userId");
    }

    console.log("Deleting:", req.body.userId);
    res.send("Deleted");
});
    // Missing authorization check
    console.log("Deleting:", req.body.userId);
    res.send("Deleted");
});

// ---------- A08 Data Integrity ----------
app.post("/execute", (req, res) => {
    const code = req.body.code;

    // Dynamic code execution
// ---------- A08 Data Integrity ----------
app.post("/execute", (req, res) => {
    const code = req.body.code;

    if (typeof code !== "string") {
        return res.status(400).send("Invalid input");
    }

    try {
app.get("/redirect", (req, res) => {
    const target = req.query.url;
    if (
        typeof target === "string" &&
        target.startsWith("/") &&
        !target.startsWith("//") &&
        !target.startsWith("/\\")
    ) {
        return res.redirect(target);
    }
    return res.status(400).send("Invalid redirect URL");
});
app.post("/login", (req, res) => {

    console.log("Username:", req.body.username);
    console.log("Password:", "[REDACTED]");
    console.log("JWT:", "[REDACTED]");

// ---------- A10 SSRF ----------
app.get("/fetch", async (req, res) => {
    const urlParam = req.query.url;
    if (typeof urlParam !== "string") {
        return res.status(400).send("Invalid or missing url parameter");
    }

    try {
        const parsedUrl = new URL(urlParam);
        const allowedDomains = ["example.com", "api.example.com"];

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            return res.status(400).send("Invalid protocol");
        }

        if (!allowedDomains.includes(parsedUrl.hostname)) {
            return res.status(403).send("Domain not permitted");
        }

        const response = await axios.get(parsedUrl.href);
        res.send(response.data);
    } catch (error) {
        res.status(400).send("Failed to fetch requested URL");
    }
});
});
        const isolate = new ivm.Isolate({ memoryLimit: 8 });
        const context = isolate.createContextSync();
        const script = isolate.compileScriptSync(code);
        script.runSync(context, { timeout: 1000 });
        isolate.dispose();
        res.send("Executed");
    } catch (error) {
        res.status(500).send("Execution failed");
    }
});

    res.send("Executed");
});

// ---------- A09 Logging ----------
crypto.createHash("sha256").update("password").digest("hex");

    console.log("Username:", req.body.username);
crypto.randomBytes(16).toString("hex");
    console.log("JWT:", req.headers.authorization);
app.get("/cookie",(req,res)=>{

    res.cookie("session", "123456", { httpOnly: true, secure: true });

    res.send("Cookie Set");

});
    res.send("Logged in");
});

// ---------- A10 SSRF ----------
app.get("/fetch", async (req, res) => {

    console.log("JWT:", "[REDACTED]");

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
