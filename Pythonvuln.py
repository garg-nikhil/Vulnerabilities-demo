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

# ---------- Another Command Injection ----------

subprocess.run(cmd,shell=True)

# ---------- Information Disclosure ----------

print("Secret:",SECRET_KEY)

# ---------- Dangerous Dynamic Execution ----------

code = input("Python code: ")

exec(code)

# ---------- Debug ----------

print("Debug mode enabled")
