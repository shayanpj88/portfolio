// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

type SeedData = {
  users: any[];
  articles: any[];
  projects: any[];
};

async function main() {
  const raw = readFileSync("prisma/data.json", "utf-8");
  const data: SeedData = JSON.parse(raw);

  console.log("🌱 Seeding database...");

  // Optional: Clean old data if needed
  await prisma.article.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // Insert users
  for (const user of data.users) {
    await prisma.user.create({ data: user });
  }

  // Insert articles
  for (const article of data.articles) {
    await prisma.article.create({ data: article });
  }

  // Insert projects
  for (const project of data.projects) {
    await prisma.project.create({ data: project });
  }

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
