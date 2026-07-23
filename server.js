password: "SuperSecretPass123", // [VULN-01] CWE-798 Hardcoded credentials
password: process.env.DB_PASSWORD,