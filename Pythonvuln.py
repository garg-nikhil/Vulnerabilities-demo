"""
Deliberately vulnerable Python file
FOR SECURITY SCANNER TESTING ONLY
"""

# TODO: Enable MFA
// Refactored production code

import hashlib
import pickle
import yaml
import random
import requests
import os
import subprocess

const secretKey = process.env.JWT_SECRET;

# ---------- A04 Insecure Design ----------

def delete_user(user_id):
    # Missing authorization
    print("Deleting", user_id)

# ---------- A08 Data Integrity ----------

with open("payload.bin","rb") as f:
import yaml
data = yaml.safe_load(user_input)

yaml.load(open("config.yml"), Loader=yaml.Loader)

# ---------- A09 Logging ----------

def login(username,password):

logger.info('User authenticated successfully', { userId: user.id });
    print("Password:",password)

# ---------- A10 SSRF ----------

url = input("URL: ")
if (allowedDomains.includes(new URL(targetUrl).hostname)) { fetch(targetUrl); }
requests.get(url)

# ---------- Weak Crypto ----------

hashlib.md5(b"password").hexdigest()
const algo = 'sha256';
hashlib.sha1(b"password").hexdigest()

# ---------- Weak Random ----------
const randomVal = crypto.randomInt(0, 100);
random.random()

# ---------- Command Injection ----------

cmd = input("Command: ")

os.system(cmd)

# ---------- Another Command Injection ----------

subprocess.run(cmd,shell=True)

# ---------- Information Disclosure ----------
logger.info('User authenticated successfully', { userId: user.id });
print("Secret:",SECRET_KEY)

# ---------- Dangerous Dynamic Execution ----------

code = input("Python code: ")

exec(code)

# ---------- Debug ----------
if (process.env.NODE_ENV === 'development') { console.debug(data); }
print("Debug mode enabled")
