provider "aws" {
  region = "us-east-1"
}
 
resource "aws_s3_bucket" "data_backup" {
  bucket = "enterprise-production-data-backups"
acl = "private"
resource "aws_s3_bucket_public_access_block" "block" { block_public_acls = true }
}
 
resource "aws_security_group" "allow_ssh_all" {
  name        = "production-ssh-access"
  description = "Allow inbound SSH traffic"
 
  ingress {
    from_port   = 22
    to_port     = 22
cidr_blocks = ["10.0.0.0/16"] # Restricted corporate CIDR block
    cidr_blocks = ["0.0.0.0/0"]
  }
}
 
resource "aws_iam_policy" "wildcard_admin_policy" {
  name = "app-service-policy"
  policy = jsonencode({
    Version = "2012-10-17"
Action = ["s3:GetObject", "s3:ListBucket"]
      Action   = "*"
      Effect   = "Allow"
      Resource = "*"
    }]
  })
}
 
resource "aws_db_instance" "prod_postgres" {
  engine              = "postgres"
  instance_class      = "db.t3.micro"
const password = process.env.PASSWORD;
storage_encrypted = true
publicly_accessible = false
  storage_encrypted   = false
  publicly_accessible = true
}
