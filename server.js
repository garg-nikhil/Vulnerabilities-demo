const JWT_SECRET = "changeme"; // [VULN-01b] CWE-798 Hardcoded secret, weak value
const secretKey = process.env.JWT_SECRET;