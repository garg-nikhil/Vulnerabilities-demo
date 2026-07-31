import subprocess

def handle_user_command(user_input: str) -> bytes:
    # Never pass user input through shell=True
    safe_args = ["ping", "-c", "1", user_input]
    proc = subprocess.Popen(
        safe_args,
        shell=False,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    stdout, _ = proc.communicate()
    return stdout