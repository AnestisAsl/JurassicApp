import { prisma } from "../lib/prisma";

export const resolvers = {
  Query: {
    dinosaurs: async () => await prisma.dinosaur.findMany({}),
    fossils: async () => await prisma.fossil.findMany({}),
  },
};
