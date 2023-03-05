import { prisma } from "../db.js";
import { GraphQLError } from "graphql";

export const Query = {
  getUserById: async (_parent, args) => {
    const user = await prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!user) {
      throw new GraphQLError(`Пользователь с id: ${args.id} не найден`);
    }

    return user;
  },

  getSpecialties: async (_parent, args) => {
    return await prisma.specialty.findMany();
  },

  getSkills: async (_parent, args) => {
    return await prisma.skill.findMany();
  },

  getCompanies: async (_parent, args) => {
    return await prisma.company.findMany();
  },

  getLocations: async (_parent, args) => {
    return await prisma.location.findMany();
  },

  getBenefits: async (_parent, args) => {
    return await prisma.benefit.findMany();
  },

  getVacancies: async (_parent, args) => {
    const { isRemote, locationIds, experience, skillIds } = args;
    const vacancies = await prisma.vacancy.findMany({
      where: { location: { id: { in: locationIds.length > 0 ? locationIds : undefined } } },
    });

    return vacancies;
  },
};
