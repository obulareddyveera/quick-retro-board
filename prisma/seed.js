const { PrismaClient } = require('@prisma/client');
const { categories } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.category.deleteMany();

    await prisma.category.createMany({
      data: categories,
    });

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();