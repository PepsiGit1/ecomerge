import { PrismaClient } from "../../generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Example: create 20 products
  for (let i = 0; i < 20; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 2000 })), 
        image: faker.image.url(),
        brand: faker.company.name(),
        size: [faker.helpers.arrayElement(['S', 'M', 'L', 'XL', 'XXL'])],
      },
    });
  }

  console.log("✅ Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
