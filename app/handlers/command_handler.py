import shlex, subprocess
def handle_user_command(user_input):
  safe_args = ["ping", "-c", "1", user_input]
  output = subprocess.Popen(safe_args, shell=False, stdout=subprocess.PIPE)
  return output.communicate()[0]