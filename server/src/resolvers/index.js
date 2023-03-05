import { Query } from "./query.js";
import { Mutation } from "./mutation.js";
import { prisma } from "../db.js";

const User = {
  id: (_parent, args, context, info) => _parent.id,
  nickname: (_parent) => _parent.nickname,
  password: (_parent) => _parent.password,
  role: (_parent) => _parent.role,
  userInfo: async (_parent, args) => {
    return await prisma.userInfo.findUnique({
      where: { userId: _parent.id },
    });
  },
  specialties: async (_parent, args) => {
    return await prisma.user
      .findUnique({
        where: { id: _parent.id },
      })
      .specialties();
  },
  skills: async (_parent, args) => {
    return await prisma.user
      .findUnique({
        where: { id: _parent.id },
      })
      .skills();
  },
  company: async (_parent, args) => {
    return await prisma.user
      .findUnique({
        where: { id: _parent.id },
      })
      .company();
  },
  applications: async (_parent, args) => {
    return await prisma.user
      .findUnique({
        where: {
          id: _parent.id,
        },
      })
      .applications();
  },
};

const UserInfo = {
  id: (_parent) => _parent.id,
  firstName: (_parent) => _parent.firstName,
  lastName: (_parent) => _parent.lastName,
  email: (_parent) => _parent.email,
  typeOfWork: (_parent) => _parent.typeOfWork,
  experience: (_parent) => _parent.experience,
  salary: (_parent) => _parent.salary,
  isLookingFor: (_parent) => _parent.isLookingFor,
  location: async (_parent, args) => {
    return await prisma.userInfo
      .findUnique({
        where: { id: _parent.id },
      })
      .location();
  },
  user: async (_parent, args) => {
    return await prisma.user.findUnique({
      where: { id: _parent.userId },
    });
  },
};

const Specialty = {
  id: (_parent) => _parent.id,
  title: (_parent) => _parent.title,
  users: async (_parent, args) => {
    return await prisma.specialty
      .findUnique({
        where: { id: _parent.id },
      })
      .users();
  },
};

const Skill = {
  id: (_parent) => _parent.id,
  title: (_parent) => _parent.title,
  users: async (_parent, args) => {
    return await prisma.skill
      .findUnique({
        where: { id: _parent.id },
      })
      .users();
  },
  vacancies: async (_parent, args) => {
    return await prisma.skill
      .findUnique({
        where: {
          id: _parent.id,
        },
      })
      .vacancies();
  },
};

const Company = {
  id: (_parent) => _parent.id,
  name: (_parent) => _parent.name,
  description: (_parent) => _parent.description,
  size: (_parent) => _parent.size,
  link: (_parent) => _parent.link,
  users: async (_parent, args) => {
    return await prisma.company
      .findUnique({
        where: { id: _parent.id },
      })
      .users();
  },
  vacancies: async (_parent, args) => {
    return await prisma.company
      .findUnique({
        where: { id: _parent.id },
      })
      .vacancy();
  },
};

const Vacancy = {
  id: (_parent) => _parent.id,
  title: (_parent) => _parent.title,
  description: (_parent) => _parent.description,
  minSalary: (_parent) => _parent.minSalary,
  maxSalary: (_parent) => _parent.maxSalary,
  location: (_parent) => _parent.location,
  experience: (_parent) => _parent.experience,
  location: async (_parent, args) => {
    return await prisma.vacancy
      .findUnique({
        where: { id: _parent.id },
      })
      .location();
  },
  skills: async (_parent, args) => {
    return await prisma.vacancy
      .findUnique({
        where: { id: _parent.id },
      })
      .skills();
  },
  benefits: async (_parent, args) => {
    return await prisma.vacancy
      .findUnique({
        where: {
          id: _parent.id,
        },
      })
      .benefits();
  },
  company: async (_parent, args) => {
    return await prisma.vacancy
      .findUnique({
        where: { id: _parent.id },
      })
      .company();
  },
  applications: async (_parent, args) => {
    return await prisma.vacancy
      .findUnique({
        where: {
          id: _parent.id,
        },
      })
      .applications();
  },
};

const Benefit = {
  id: (_parent) => _parent.id,
  title: (_parent) => _parent.title,
  vacancies: async (_parent, args) => {
    return await prisma.benefit
      .findUnique({
        where: { id: _parent.id },
      })
      .vacancies();
  },
};

const Location = {
  id: (_parent) => _parent.id,
  title: (_parent) => _parent.title,
  userInfos: async (_parent, args) => {
    return await prisma.location
      .findUnique({
        where: { id: _parent.id },
      })
      .userInfos();
  },
  vacancies: async (_parent, args) => {
    return await prisma.location
      .findUnique({
        where: { id: _parent.id },
      })
      .vacancies();
  },
};

const Application = {
  user: async (_parent, args) => {
    return await prisma.user.findUnique({
      where: { id: _parent.userId },
    });
  },
  vacancy: async (_parent, args) => {
    return await prisma.vacancy.findUnique({
      where: { id: _parent.vacancyId },
    });
  },
  status: (_parent) => _parent.status,
  message: (_parent) => _parent.message,
};

export const resolvers = {
  Query,
  Mutation,
  User,
  UserInfo,
  Specialty,
  Skill,
  Company,
  Vacancy,
  Benefit,
  Location,
  Application,
};
