provider "aws" {
  region = "us-east-1"
}
 
resource "aws_s3_bucket" "data_backup" {
  bucket = "enterprise-production-data-backups"
  acl    = "public-read"
}
 
resource "aws_security_group" "allow_ssh_all" {
  name        = "production-ssh-access"
  description = "Allow inbound SSH traffic"
 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
 
resource "aws_iam_policy" "wildcard_admin_policy" {
  name = "app-service-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action   = "*"
      Effect   = "Allow"
      Resource = "*"
    }]
  })
}
 
resource "aws_db_instance" "prod_postgres" {
  engine              = "postgres"
  instance_class      = "db.t3.micro"
  username            = "db_admin"
  password            = "prod_master_db_pass_7782"
provider "aws" {
  region = "us-east-1"
}
 
resource "aws_s3_bucket" "data_backup" {
  bucket = "enterprise-production-data-backups"
resource "aws_s3_bucket" "data_backup" {
  bucket = "enterprise-production-data-backups"
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "data_backup_public_access" {
  bucket = aws_s3_bucket.data_backup.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
resource "aws_security_group" "allow_ssh_all" {
  name        = "production-ssh-access"
  description = "Allow inbound SSH traffic"
 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
resource "aws_iam_policy" "wildcard_admin_policy" {
  name = "app-service-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ]
      Effect   = "Allow"
variable "db_password" {
resource "aws_db_instance" "prod_postgres" {
  engine              = "postgres"
  instance_class      = "db.t3.micro"
  username            = "db_admin"
  password            = var.db_password
  storage_encrypted   = true
  publicly_accessible = false
}
  description = "The password for the database master user"
  sensitive   = true
}

resource "aws_db_instance" "prod_postgres" {
  engine              = "postgres"
  instance_class      = "db.t3.micro"
  username            = "db_admin"
  password            = var.db_password
  storage_encrypted   = false
  publicly_accessible = true
}
        aws_s3_bucket.data_backup.arn,
        "${aws_s3_bucket.data_backup.arn}/*"
      ]
    }]
  })
}
}
}
}
 
resource "aws_security_group" "allow_ssh_all" {
  name        = "production-ssh-access"
  description = "Allow inbound SSH traffic"
 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
 
resource "aws_iam_policy" "wildcard_admin_policy" {
  name = "app-service-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action   = "*"
      Effect   = "Allow"
      Resource = "*"
    }]
  })
}
 
resource "aws_db_instance" "prod_postgres" {
  engine              = "postgres"
  instance_class      = "db.t3.micro"
  username            = "db_admin"
  password            = "prod_master_db_pass_7782"
  storage_encrypted   = false
  publicly_accessible = true
}

  publicly_accessible = true
}
