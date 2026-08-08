FROM ubuntu:18.04

USER root

RUN apt-get update

RUN apt-get install -y curl wget

ENV DEMO_PASSWORD="SuperSecretDockerPassword123"

EXPOSE 3000

CMD ["echo", "DB SecurePilot scanner test image"]
