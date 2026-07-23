if (!process.env.AWS_SECRET) {
  throw new Error("Missing required environment variable: AWS_SECRET");
}
const AWS_SECRET = process.env.AWS_SECRET;