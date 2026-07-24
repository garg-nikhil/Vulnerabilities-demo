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

const JWT_SECRET = process.env.JWT_SECRET || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const ADMIN_PASSWORD = "admin123";

app.post("/delete-user", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send("Unauthorized: Authentication required");
        return;
    }

    const userRole = req.headers["x-user-role"];
    if (userRole !== "admin") {
        res.status(403).send("Forbidden: Insufficient privileges");
        return;
    }

    console.log("Deleting:", req.body.userId);
    res.send("Deleted");
});

// ---------- A04 Insecure Design ----------
app.post("/delete-user", (req, res) => {
    // Missing authorization check
    console.log("Deleting:", req.body.userId);
    res.send("Deleted");
});

// ---------- A08 Data Integrity ----------
app.post("/execute", (req, res) => {
    const code = req.body.code;

import ivm from "isolated-vm";

// ---------- A08 Data Integrity ----------
app.post("/execute", (req, res) => {
    const code = req.body.code;
    if (typeof code !== "string") {
        res.status(400).send("Invalid code input");
        return;
    }
// ---------- A09 Logging ----------
app.post("/login", (req, res) => {

    console.log("Username:", req.body.username);
// ---------- A10 SSRF ----------
app.get("/fetch", async (req, res) => {
    const urlStr = req.query.url as string;
    if (!urlStr) {
        res.status(400).send("URL parameter is required");
        return;
    }

// ---------- Open Redirect ----------
app.get("/redirect", (req, res) => {
    const target = req.query.url;
    if (typeof target === "string" && target.startsWith("/") && !target.startsWith("//") && !target.startsWith("/\\")) {
        res.redirect(target);
    } else {
        res.status(400).send("Invalid or unsafe redirect URL");
    }
});
        const parsedUrl = new URL(urlStr);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            res.status(400).send("Invalid protocol");
            return;
        }

        const hostname = parsedUrl.hostname.toLowerCase();
        const isInternal =
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            hostname === "169.254.169.254" ||
            hostname === "0.0.0.0" ||
            hostname === "[::1]" ||
            hostname.startsWith("127.") ||
            hostname.startsWith("10.") ||
            hostname.startsWith("192.168.");

        if (isInternal) {
            res.status(403).send("Forbidden URL");
            return;
        }

        const response = await axios.get(parsedUrl.toString());
        res.send(response.data);
    } catch (err) {
        res.status(400).send("Invalid URL or fetch error");
    }
});
    console.log("JWT: [REDACTED]");

    res.send("Logged in");
});
    try {
        const isolate = new ivm.Isolate({ memoryLimit: 128 });
        const context = isolate.createContextSync();
        const script = isolate.compileScriptSync(code);
        script.runSync(context, { timeout: 1000 });
        isolate.dispose();
        res.send("Executed");
    } catch (err) {
        res.status(400).send("Execution failed");
    }
});
    vm.runInNewContext(code);

    res.send("Executed");
});
crypto.createHash("sha256").update("password").digest("hex");
// ---------- A09 Logging ----------
app.post("/login", (req, res) => {
// ---------- Weak Random ----------
crypto.randomBytes(16).toString("hex");
    console.log("Username:", req.body.username);
    console.log("Password:", req.body.password);
    console.log("JWT:", req.headers.authorization);
// ---------- Insecure Cookie ----------
app.get("/cookie",(req,res)=>{

    res.cookie("session", "123456", { httpOnly: true });

    res.send("Cookie Set");

});
    res.send("Logged in");
});
    console.log("Username:", req.body.username);
    console.log("Password: [REDACTED]");
    console.log("JWT: [REDACTED]");
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
