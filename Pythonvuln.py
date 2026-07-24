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

SECRET_KEY = os.getenv("SECRET_KEY")

# ---------- A04 Insecure Design ----------

def delete_user(user_id):
    # Missing authorization
    print("Deleting", user_id)

# ---------- A08 Data Integrity ----------

with open("payload.bin","rb") as f:
import json

with open("payload.json", "r") as f:
    obj = json.load(f)

with open("config.yml", "r") as f:
    yaml.safe_load(f)

yaml.load(open("config.yml"), Loader=yaml.Loader)
def login(username,password):

    print("Username:",username)
    print("Password:", "[REDACTED]")
# ---------- A09 Logging ----------

from urllib.parse import urlparse

ALLOWED_DOMAINS = {"example.com", "api.example.com"}

url = input("URL: ")
parsed_url = urlparse(url)
hashlib.sha256(b"password").hexdigest()
if parsed_url.scheme in ("http", "https") and parsed_url.netloc in ALLOWED_DOMAINS:
    requests.get(url)
else:
random.SystemRandom().random()

    print("Username:",username)
    print("Password:",password)

# ---------- A10 SSRF ----------

url = input("URL: ")

requests.get(url)

# ---------- Weak Crypto ----------

hashlib.md5(b"password").hexdigest()
    print("Username:",username)
    print("Password:", "[REDACTED]")
hashlib.sha1(b"password").hexdigest()

# ---------- Weak Random ----------

data_input = input("JSON data: ")

parsed_data = json.loads(data_input)

# ---------- Command Injection ----------

# ---------- Debug ----------

if os.getenv("ENV") != "production":
    print("Debug mode enabled")

os.system(cmd)

# ---------- Another Command Injection ----------

subprocess.run(cmd,shell=True)

# ---------- Information Disclosure ----------

print("Secret:",SECRET_KEY)

# ---------- Dangerous Dynamic Execution ----------

code = input("Python code: ")

exec(code)

# ---------- Debug ----------

print("Debug mode enabled")
