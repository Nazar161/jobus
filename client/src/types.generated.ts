export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCompanyInput = {
  description: Scalars['String'];
  link?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  recruiterId: Scalars['ID'];
  size?: InputMaybe<Scalars['Float']>;
};

export type AddVacancyInput = {
  benefits?: InputMaybe<Array<Scalars['ID']>>;
  description: Scalars['String'];
  experience: Experience;
  isRemote: Scalars['Boolean'];
  locationId: Scalars['ID'];
  maxSalary?: InputMaybe<Scalars['Float']>;
  minSalary?: InputMaybe<Scalars['Float']>;
  recruiterId: Scalars['ID'];
  skills?: InputMaybe<Array<Scalars['ID']>>;
  title: Scalars['String'];
};

export type Application = {
  __typename?: 'Application';
  message?: Maybe<Scalars['String']>;
  status: Status;
  user: User;
  vacancy: Vacancy;
};

export type Benefit = {
  __typename?: 'Benefit';
  id: Scalars['ID'];
  title: Scalars['String'];
  vacancies?: Maybe<Array<Maybe<Vacancy>>>;
};

export type Company = {
  __typename?: 'Company';
  description: Scalars['String'];
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  size?: Maybe<Scalars['Float']>;
  users?: Maybe<Array<Maybe<User>>>;
  vacancies?: Maybe<Array<Maybe<Vacancy>>>;
};

export enum Experience {
  From_0To_1 = 'FROM_0_TO_1',
  From_1To_2 = 'FROM_1_TO_2',
  From_2To_4 = 'FROM_2_TO_4',
  From_4To_6 = 'FROM_4_TO_6',
  From_6 = 'FROM_6'
}

export type FilterVacanciesInput = {
  experience?: InputMaybe<Experience>;
  isRemote?: InputMaybe<Scalars['Boolean']>;
  locationIds?: InputMaybe<Array<InputMaybe<UniversalIdInput>>>;
  skillIds?: InputMaybe<Array<InputMaybe<UniversalIdInput>>>;
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['ID'];
  title: Scalars['String'];
  userInfos?: Maybe<Array<Maybe<UserInfo>>>;
  vacancies?: Maybe<Array<Maybe<Vacancy>>>;
};

export type MutateUserInfoInput = {
  email?: InputMaybe<Scalars['String']>;
  experience?: InputMaybe<Experience>;
  firstName?: InputMaybe<Scalars['String']>;
  isLookingFor?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  salary?: InputMaybe<Scalars['Float']>;
  typeOfWork?: InputMaybe<TypeOfWork>;
  userId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCompany?: Maybe<Company>;
  addVacancy: Vacancy;
  applyToVacancy?: Maybe<Application>;
  createSkill?: Maybe<Skill>;
  createSpecialty?: Maybe<Specialty>;
  mutateUserInfo?: Maybe<UserInfo>;
  selectCompany: User;
  signIn?: Maybe<User>;
  signUp?: Maybe<User>;
  updateUserSkills: User;
  updateUserSpecialties: User;
};


export type MutationAddCompanyArgs = {
  data: AddCompanyInput;
};


export type MutationAddVacancyArgs = {
  data: AddVacancyInput;
};


export type MutationApplyToVacancyArgs = {
  message?: InputMaybe<Scalars['String']>;
  userId: Scalars['ID'];
  vacancyId: Scalars['ID'];
};


export type MutationCreateSkillArgs = {
  title: Scalars['String'];
};


export type MutationCreateSpecialtyArgs = {
  title: Scalars['String'];
};


export type MutationMutateUserInfoArgs = {
  data?: InputMaybe<MutateUserInfoInput>;
};


export type MutationSelectCompanyArgs = {
  companyId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationSignInArgs = {
  nickname: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpArgs = {
  nickname: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};


export type MutationUpdateUserSkillsArgs = {
  data?: InputMaybe<Array<UniversalIdInput>>;
  userId: Scalars['ID'];
};


export type MutationUpdateUserSpecialtiesArgs = {
  data?: InputMaybe<Array<UniversalIdInput>>;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getBenefits?: Maybe<Array<Benefit>>;
  getCompanies?: Maybe<Array<Company>>;
  getLocations?: Maybe<Array<Location>>;
  getSkills?: Maybe<Array<Skill>>;
  getSpecialties: Array<Specialty>;
  getUserById?: Maybe<User>;
  getVacancies?: Maybe<Array<Maybe<Vacancy>>>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetVacanciesArgs = {
  filters?: InputMaybe<FilterVacanciesInput>;
};

export enum Role {
  Admin = 'ADMIN',
  Candidate = 'CANDIDATE',
  Recruiter = 'RECRUITER'
}

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['ID'];
  title: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
  vacancies?: Maybe<Array<Maybe<Vacancy>>>;
};

export type Specialty = {
  __typename?: 'Specialty';
  id: Scalars['ID'];
  title: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export enum Status {
  Invitation = 'INVITATION',
  NotViewed = 'NOT_VIEWED',
  Refused = 'REFUSED',
  Viewed = 'VIEWED'
}

export enum TypeOfWork {
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME'
}

export type UniversalIdInput = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  applications?: Maybe<Array<Maybe<Application>>>;
  company?: Maybe<Company>;
  id: Scalars['ID'];
  nickname: Scalars['String'];
  password: Scalars['String'];
  role: Role;
  skills?: Maybe<Array<Maybe<Skill>>>;
  specialties?: Maybe<Array<Maybe<Specialty>>>;
  userInfo?: Maybe<UserInfo>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email: Scalars['String'];
  experience: Experience;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  isLookingFor: Scalars['Boolean'];
  lastName: Scalars['String'];
  location?: Maybe<Location>;
  salary?: Maybe<Scalars['Float']>;
  typeOfWork?: Maybe<TypeOfWork>;
  user?: Maybe<User>;
};

export type Vacancy = {
  __typename?: 'Vacancy';
  applications?: Maybe<Array<Maybe<Application>>>;
  benefits?: Maybe<Array<Maybe<Benefit>>>;
  company?: Maybe<Company>;
  description: Scalars['String'];
  experience: Experience;
  id: Scalars['ID'];
  isRemote: Scalars['Boolean'];
  location: Location;
  maxSalary?: Maybe<Scalars['Float']>;
  minSalary?: Maybe<Scalars['Float']>;
  skills?: Maybe<Array<Maybe<Skill>>>;
  title: Scalars['String'];
};
