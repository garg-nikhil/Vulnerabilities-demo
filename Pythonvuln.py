"""
Deliberately vulnerable Python file
FOR SECURITY SCANNER TESTING ONLY
"""

# TODO: Enable MFA
# FIXME: Remove test account

import hashlib
import pickle
import yaml
import random
import requests
import os
import subprocess

SECRET_KEY = "supersecret"

# ---------- A04 Insecure Design ----------

def delete_user(user_id):
    # Missing authorization
    print("Deleting", user_id)

# ---------- A08 Data Integrity ----------

with open("payload.bin","rb") as f:
    obj = pickle.load(f)

yaml.load(open("config.yml"), Loader=yaml.Loader)

# ---------- A09 Logging ----------

def login(username,password):

    print("Username:",username)
    print("Password:",password)

# ---------- A10 SSRF ----------

url = input("URL: ")

requests.get(url)

# ---------- Weak Crypto ----------

hashlib.md5(b"password").hexdigest()

hashlib.sha1(b"password").hexdigest()

# ---------- Weak Random ----------

random.random()

# ---------- Command Injection ----------

cmd = input("Command: ")

os.system(cmd)

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
    obj = pickle.load(f)

import json

with open("payload.json", "r") as f:
    obj = json.load(f)

with open("config.yml", "r") as f:
    config = yaml.safe_load(f)
def login(username,password):

    print("Username:",username)
    print("Password: [REDACTED]")
# ---------- A09 Logging ----------

from urllib.parse import urlparse

url = input("URL: ")
parsed_url = urlparse(url)
ALLOWED_DOMAINS = {"example.com", "api.example.com"}

hashlib.sha256(b"password").hexdigest()
    requests.get(url)
else:
    raise ValueError("Untrusted or invalid URL destination")
import secrets

secrets.SystemRandom().random()
    print("Username:",username)
    print("Password:",password)

# ---------- A10 SSRF ----------

import shlex

# ---------- Command Injection ----------
if os.getenv("ENV") != "production":
    print("Debug mode enabled")
cmd = input("Command: ")

cmd_args = shlex.split(cmd)
if cmd_args:
    subprocess.run(cmd_args, shell=False)

# ---------- Another Command Injection ----------

if cmd_args:
    subprocess.run(cmd_args, shell=False)

requests.get(url)

# ---------- Weak Crypto ----------

    print("Username:",username)
    print("Password: [REDACTED]")

hashlib.sha1(b"password").hexdigest()

# ---------- Weak Random ----------
import json

data_input = input("JSON data: ")
data = json.loads(data_input)
random.random()

# ---------- Command Injection ----------
if os.getenv("ENV") != "production":
    print("Debug mode enabled")
cmd = input("Command: ")

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


subprocess.run(cmd,shell=True)

# ---------- Information Disclosure ----------

print("Secret:",SECRET_KEY)

# ---------- Dangerous Dynamic Execution ----------

code = input("Python code: ")

exec(code)

# ---------- Debug ----------

print("Debug mode enabled")
