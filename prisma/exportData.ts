import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function exportData() {
  const users = await prisma.user.findMany();
  const articles = await prisma.article.findMany();
  const projects = await prisma.project.findMany();

  // Add other tables as needed

  const data = {
    users,
    articles,
    projects,
  };

  // Write as JS file that exports the data
  const seedContent = `module.exports = ${JSON.stringify(data, null, 2)};\n`;

  fs.writeFileSync("prisma/seedData.js", seedContent);
  console.log("Data exported to prisma/seedData.js");
}

exportData()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
