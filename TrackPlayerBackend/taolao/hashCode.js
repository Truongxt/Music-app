import bcrypt from "bcryptjs";

const password = "@HTuan12345";

const hashPassword = async () => {
  const hashed = await bcrypt.hash(password, 10); // 10 là salt rounds
  console.log("Hashed password:", hashed);
};

hashPassword();