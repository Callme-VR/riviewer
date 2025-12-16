import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from './generated/prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const PrismaClientSingleton = (): PrismaClient => {
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: ReturnType<typeof PrismaClientSingleton> | undefined;
}

const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;