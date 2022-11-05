import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {});

  await prisma.recipie.deleteMany().catch(() => {});

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.recipie.create({
    data: {
      name: "Pancakes",
      description: "Some delicious pancakes",
      image:
        "https://assets.afcdn.com/recipe/20211222/126211_w1024h1024c1cx1075cy827.jpg",
    },
  });

  await prisma.recipie.create({
    data: {
      name: "Pasta",
      description: "Some delicious pasta",
      image:
        "https://www.madamecuisine.de/wp-content/uploads/2022/07/pasta-al-pomodoro-featured.jpg",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
