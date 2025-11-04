// generate-secret.js
import fs from "fs";
import crypto from "crypto";

const envPath = "/.env";

// Tạo chuỗi ngẫu nhiên 64 bytes (128 ký tự hex)
const secret = crypto.randomBytes(64).toString("hex");

// Nếu đã có file .env, đọc nội dung cũ
let content = "";
if (fs.existsSync(envPath)) {
  content = fs.readFileSync(envPath, "utf8");
  // Nếu đã có JWT_SECRET, ghi đè
  if (content.includes("JWT_SECRET=")) {
    content = content.replace(/JWT_SECRET=.*/g, `JWT_SECRET=${secret}`);
  } else {
    content += `\nJWT_SECRET=${secret}`;
  }
} else {
  content = `JWT_SECRET=${secret}\n`;
}

// Ghi lại vào file .env
fs.writeFileSync(envPath, content.trim() + "\n");

console.log("✅ JWT_SECRET generated and saved to .env");
console.log("🔐 Secret:", secret);
