provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "demo_bucket" {
  bucket = "securepilot-demo-bucket"

  tags = {
    Name = "SecurePilot Demo"
  }
}

resource "aws_security_group" "demo_sg" {
  name = "securepilot-demo-sg"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
