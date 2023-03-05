import { GraphQLError } from "graphql";
import { prisma } from "../db.js";

export const Mutation = {
  signUp: async (_parent, args) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        nickname: args.nickname,
      },
    });

    if (existingUser) {
      throw new GraphQLError("Пользователь с таким никнеймом уже существует");
    }

    const user = await prisma.user.create({
      data: {
        nickname: args.nickname,
        password: args.password,
        role: args.role,
      },
    });

    return user;
  },

  signIn: async (_parent, args) => {
    const user = await prisma.user.findUnique({
      where: {
        nickname: args.nickname,
      },
    });

    if (!user) {
      throw new GraphQLError("Пользователь с таким никнеймом не найден, проверьте корректность данных");
    }

    if (user.password == args.password) {
      return user;
    } else {
      throw new GraphQLError("Неправильный пароль");
    }
  },

  mutateUserInfo: async (_parent, args) => {
    const { userId, firstName, lastName, email, typeOfWork, experience, salary, location, isLookingFor } =
      args.data;
    const userData = await prisma.userInfo.upsert({
      where: { userId: userId },
      update: {
        firstName: firstName != null ? firstName : undefined,
        lastName: lastName != null ? lastName : undefined,
        email: email != null ? email : undefined,
        typeOfWork: typeOfWork != null ? typeOfWork : undefined,
        experience: experience != null ? experience : undefined,
        salary: salary != null ? salary : undefined,
        location: location != null ? location : undefined,
        isLookingFor: isLookingFor != null ? isLookingFor : undefined,
      },
      create: {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        experience: experience,
        isLookingFor: isLookingFor,
        typeOfWork: typeOfWork != null ? typeOfWork : undefined,
        salary: salary != null ? salary : undefined,
        location: location != null ? location : undefined,
      },
    });

    return userData;
  },

  updateUserSpecialties: async (_parent, args) => {
    const user = await prisma.user.update({
      where: { id: args.userId },
      data: {
        specialties: { set: args.data },
      },
    });

    return user;
  },

  createSpecialty: async (_parent, args) => {
    const spec = await prisma.specialty.findUnique({
      where: {
        title: args.title,
      },
    });

    if (spec) {
      throw new GraphQLError("Такая специальность уже есть в базе");
    }

    return await prisma.specialty.create({
      data: {
        title: args.title,
      },
    });
  },

  updateUserSkills: async (_parent, args) => {
    const user = await prisma.user.update({
      where: {
        id: args.userId,
      },
      data: { skills: { set: args.data } },
    });

    return user;
  },

  createSkill: async (_parent, args) => {
    const skill = await prisma.skill.findUnique({
      where: {
        title: args.title,
      },
    });

    if (skill) {
      throw new GraphQLError("Такой навык уже есть в базе");
    }

    return await prisma.skill.create({
      data: {
        title: args.title,
      },
    });
  },

  selectCompany: async (_parent, args) => {
    const recruiter = await prisma.user.update({
      where: {
        id: args.userId,
      },
      data: {
        company: {
          connect: {
            id: args.companyId,
          },
        },
      },
    });

    return recruiter;
  },

  addCompany: async (_parent, args) => {
    const { recruiterId, name, description, size, link } = args.data;
    const existingCompany = await prisma.company.findUnique({
      where: {
        name: name,
      },
    });

    if (existingCompany) {
      throw new GraphQLError(`Компания ${name} уже зарегистрирована, выберите её из списка!`);
    }

    const company = await prisma.company.create({
      data: {
        name: name,
        description: description,
        size: size != null ? size : undefined,
        link: link != null ? link : undefined,
        users: {
          connect: [{ id: recruiterId }],
        },
      },
    });

    return company;
  },

  addVacancy: async (_parent, args) => {
    const {
      title,
      description,
      minSalary,
      maxSalary,
      experience,
      isRemote,
      skills,
      locationId,
      recruiterId,
      benefits,
    } = args.data;

    const user = await prisma.user.findUnique({
      where: {
        id: recruiterId,
      },
      select: {
        companyId: true,
      },
    });

    const vacancy = await prisma.vacancy.create({
      data: {
        title: title,
        description: description,
        minSalary: minSalary != null ? minSalary : undefined,
        maxSalary: maxSalary != null ? maxSalary : undefined,
        experience: experience,
        isRemote: isRemote,
        skills: {
          connect: skills.map((s) => ({ id: s })),
        },
        location: {
          connect: { id: locationId },
        },
        company: {
          connect: { id: user.companyId },
        },
        benefits: {
          connect: benefits.map((b) => ({ id: b })),
        },
      },
    });

    return vacancy;
  },

  applyToVacancy: async (_parent, args) => {
    const { userId, vacancyId, message } = args;

    const application = await prisma.application.create({
      data: {
        user: {
          connect: { id: userId },
        },
        vacancy: {
          connect: { id: vacancyId },
        },
        message: message != null ? message : undefined,
        status: "NOT_VIEWED",
      },
    });

    return application;
  },
};
