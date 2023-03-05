export const typeDefs = `#graphql
  type User {
    id: ID!
    nickname: String!
    password: String!
    role: Role!
    userInfo: UserInfo
    specialties: [Specialty]
    skills: [Skill]
    company: Company
    applications: [Application]
  }

  type UserInfo {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    typeOfWork: TypeOfWork
    experience: Experience!
    salary: Float
    location: Location
    isLookingFor: Boolean!
    user: User
  }

  type Specialty {
    id: ID!
    title: String!
    users: [User]
  }

  type Skill {
    id: ID!
    title: String!
    users: [User]
    vacancies: [Vacancy]
  }

  type Company {
    id: ID!
    name: String!
    description: String!
    size: Float
    link: String
    users: [User]
    vacancies: [Vacancy]
  }

  type Vacancy {
    id: ID!
    title: String!
    description: String!
    minSalary: Float
    maxSalary: Float
    isRemote: Boolean!
    location: Location!
    experience: Experience!
    skills: [Skill]
    benefits: [Benefit]
    company: Company
    applications: [Application]
  }

  type Benefit {
    id: ID!
    title: String!
    vacancies: [Vacancy]
  }

  type Location {
    id: ID!
    title: String!
    userInfos: [UserInfo]
    vacancies: [Vacancy]
  }

  enum Role {
    RECRUITER
    CANDIDATE
    ADMIN
  }

  enum TypeOfWork {
    FULL_TIME
    PART_TIME
  }

  enum Experience {
    FROM_0_TO_1
    FROM_1_TO_2
    FROM_2_TO_4
    FROM_4_TO_6
    FROM_6
  }

  enum Status {
    NOT_VIEWED
    VIEWED
    INVITATION
    REFUSED
  }

  type Application {
    user: User!
    vacancy: Vacancy!
    status: Status!
    message: String
  }

  type Query {
    getUserById(id: ID!): User
    getSpecialties: [Specialty!]!
    getSkills: [Skill!]
    getCompanies: [Company!]
    getVacancies(filters: FilterVacanciesInput): [Vacancy]
    getLocations: [Location!]
    getBenefits: [Benefit!]
  }

  type Mutation {
    signUp(nickname: String!, password: String!, role: Role!): User
    signIn(nickname: String!, password: String!): User
    mutateUserInfo(data: MutateUserInfoInput): UserInfo
    updateUserSpecialties(userId: ID!, data: [UniversalIdInput!]): User!
    createSpecialty(title: String!): Specialty
    updateUserSkills(userId: ID!, data: [UniversalIdInput!]): User!
    createSkill(title: String!): Skill
    selectCompany(userId: ID!, companyId: ID!): User!
    addCompany(data: AddCompanyInput!): Company
    addVacancy(data: AddVacancyInput!): Vacancy!
    applyToVacancy(userId: ID!, vacancyId: ID!, message: String): Application
  }

  input UniversalIdInput {
    id: ID!
  }

  input MutateUserInfoInput {
    userId: ID!
    firstName: String
    lastName: String
    email: String
    typeOfWork: TypeOfWork
    experience: Experience
    salary: Float
    location: String
    isLookingFor: Boolean
  }

  input AddCompanyInput {
    recruiterId: ID!
    name: String!
    description: String!
    size: Float
    link: String
  }

  input FilterVacanciesInput {
    isRemote: Boolean
    locationIds: [UniversalIdInput]
    experience: Experience
    skillIds: [UniversalIdInput]
  }

  input AddVacancyInput {
    title: String!
    description: String!
    minSalary: Float
    maxSalary: Float
    experience: Experience!
    isRemote: Boolean!
    skills: [ID!]
    locationId: ID!
    recruiterId: ID!
    benefits: [ID!]
  }
`;
