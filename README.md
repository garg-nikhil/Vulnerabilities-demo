# demo-vuln-app

A tiny, intentionally vulnerable Node.js/Express app for demonstrating and
scoring a vulnerability scanner. ~120 lines total across `server.js` — small
enough to avoid GitHub API tree-truncation and file-cap issues, but with a
labeled vulnerability in every major OWASP Top 10 (2021) category plus one
dependency-based (SCA) test.

**Do not deploy this app anywhere. It is deliberately broken.**

## Ground truth — expected findings (11 total)

| ID | File | Line (approx) | CWE | OWASP Category | Description |
|----|------|------|-----|-----------------|--------------|
| VULN-01 | server.js | 20 | CWE-798 | A07:2021 | Hardcoded DB password |
| VULN-01b | server.js | 24 | CWE-798 | A02:2021 | Hardcoded, weak JWT secret |
| VULN-02 | server.js | 28-33 | CWE-89 | A03:2021 | SQL injection via string concatenation |
| VULN-03 | server.js | 37-42 | CWE-78 | A03:2021 | OS command injection via `exec()` |
| VULN-04 | server.js | 46-49 | CWE-79 | A03:2021 | Reflected XSS, unescaped output |
| VULN-05 | server.js | 52-54 | CWE-327 | A02:2021 | MD5 used for password hashing |
| VULN-06 | server.js | 68-71 | CWE-347 | A02:2021 | JWT decoded without signature verification |
| VULN-07 | server.js | 75-81 | CWE-22 | A01:2021 | Path traversal in file download endpoint |
| VULN-08 | server.js | 85-89 | CWE-94 | A03:2021 | `eval()` on user-controlled input |
| VULN-09 | server.js | 93-101 | CWE-352 | A01:2021 | No CSRF protection on funds-transfer endpoint |
| VULN-10 | server.js | 105-108 | CWE-942 | A05:2021 | CORS reflects Origin + allows credentials |
| SCA-01 | package.json | — | CWE-1104 | A06:2021 | `lodash@4.17.15` — known prototype pollution (CVE-2019-10744) |
| SCA-02 | package.json | — | CWE-1104 | A06:2021 | `minimist@0.0.8` — known prototype pollution (CVE-2020-7598) |

## How to use this for a demo

1. Push this folder as its own small GitHub repo (public or private).
2. Point your scanner at it — full-repo scan should be fast since it's ~4 files.
3. Compare returned findings against the table above to compute:
   - **Recall** = findings your tool caught / 13 total ground-truth items
   - **False positives** = findings reported that aren't in this table
4. Run the same scan against `fixed/server-fixed.js` — a good scanner should
   report zero (or near-zero) of the same findings there, which demonstrates
   your remediation-verification logic works, not just detection.

## Suggested second demo repo (external, also small)

If you want an *external* second data point beyond this repo:
- **snyk-labs/nodejs-goof** — small deliberately vulnerable Node/Express app,
  widely used to demo SAST/SCA tools, similar vuln categories to this one.
- **appsecco/dvna** ("Damn Vulnerable NodeJS App") — small, lesson-based,
  each vulnerability isolated in its own route/file.

Avoid pointing at OWASP-Benchmark/BenchmarkJava for a "prove it works" demo —
it's 2,000+ files, which is a stress test of scanner *infrastructure*
(pagination, batching, coverage math), not a quick efficacy demo.
