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

const JWT_SECRET = "super-secret-key";
const ADMIN_PASSWORD = "admin123";

app.use(express.json());

// ---------- A04 Insecure Design ----------
const authorizeAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).send("Unauthorized");
        return;
    }

    const token = authHeader.split(" ")[1];
    if (token !== JWT_SECRET) {
        res.status(403).send("Forbidden");
        return;
    }

    next();
};

// ---------- A04 Insecure Design ----------
app.post("/delete-user", authorizeAdmin, (req, res) => {
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
app.post("/execute", (req, res) => {
    const code = req.body.code;

    if (typeof code !== "string") {
// ---------- Open Redirect ----------
app.get("/redirect", (req, res) => {
    const target = req.query.url;

    if (typeof target !== "string") {
        res.status(400).send("Invalid URL parameter");
        return;
    }

    // Allow only relative URLs starting with / (excluding protocol-relative // or /\)
    if (target.startsWith("/") && !target.startsWith("//") && !target.startsWith("/\\")) {
        res.redirect(target);
        return;
    }

    res.status(400).send("Invalid or untrusted redirect URL");
});
        return;
    }

    try {
app.post("/login", (req, res) => {

    console.log("Username:", req.body.username);
    console.log("Password:", "[REDACTED]");
    console.log("JWT:", req.headers.authorization ? "[REDACTED]" : undefined);

    res.send("Logged in");
// ---------- A10 SSRF ----------
app.get("/fetch", async (req, res) => {
    const urlStr = req.query.url;

    if (typeof urlStr !== "string") {
        res.status(400).send("Invalid URL parameter");
        return;
    }

    try {
        const parsedUrl = new URL(urlStr);
        const allowedDomains = ["api.example.com", "trusted.example.com"];

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            res.status(400).send("Invalid URL protocol");
            return;
        }

        if (!allowedDomains.includes(parsedUrl.hostname)) {
            res.status(403).send("Domain not allowed");
            return;
        }

        const response = await axios.get(parsedUrl.toString());
        res.send(response.data);
    } catch (err) {
        res.status(400).send("Invalid or unsafe URL request");
    }
});
        const isolate = new ivm.Isolate({ memoryLimit: 128 });
        const context = isolate.createContextSync();
        const script = isolate.compileScriptSync(code);
        script.runSync(context, { timeout: 1000 });
        isolate.dispose();

        res.send("Executed");
    } catch (err) {
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

    res.cookie("session", "123456", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });

    res.send("Cookie Set");

});
    res.send("Logged in");
});
    console.log("JWT:", req.headers.authorization ? "[REDACTED]" : undefined);
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
