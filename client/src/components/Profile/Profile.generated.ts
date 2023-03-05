import * as Types from '../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetRecruiterQueryVariables = Types.Exact<{
  getUserByIdId: Types.Scalars['ID'];
}>;


export type GetRecruiterQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', id: string, nickname: string, userInfo?: { __typename?: 'UserInfo', email: string, firstName: string, lastName: string } | null, company?: { __typename?: 'Company', id: string, name: string, vacancies?: Array<{ __typename?: 'Vacancy', id: string, title: string, minSalary?: number | null, maxSalary?: number | null, experience: Types.Experience, applications?: Array<{ __typename?: 'Application', status: Types.Status, user: { __typename?: 'User', id: string, userInfo?: { __typename?: 'UserInfo', firstName: string, lastName: string, experience: Types.Experience, email: string, salary?: number | null } | null } } | null> | null } | null> | null } | null } | null };

export type AddVacancyMutationVariables = Types.Exact<{
  data: Types.AddVacancyInput;
}>;


export type AddVacancyMutation = { __typename?: 'Mutation', addVacancy: { __typename?: 'Vacancy', id: string } };

export type GetLocationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = { __typename?: 'Query', getLocations?: Array<{ __typename?: 'Location', title: string, id: string }> | null };

export type GetSkillsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSkillsQuery = { __typename?: 'Query', getSkills?: Array<{ __typename?: 'Skill', id: string, title: string }> | null };

export type GetBenefitsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBenefitsQuery = { __typename?: 'Query', getBenefits?: Array<{ __typename?: 'Benefit', id: string, title: string }> | null };


export const GetRecruiterDocument = gql`
    query GetRecruiter($getUserByIdId: ID!) {
  getUserById(id: $getUserByIdId) {
    id
    nickname
    userInfo {
      email
      firstName
      lastName
    }
    company {
      id
      name
      vacancies {
        id
        title
        minSalary
        maxSalary
        experience
        applications {
          status
          user {
            id
            userInfo {
              firstName
              lastName
              experience
              email
              salary
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetRecruiterQuery__
 *
 * To run a query within a React component, call `useGetRecruiterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecruiterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecruiterQuery({
 *   variables: {
 *      getUserByIdId: // value for 'getUserByIdId'
 *   },
 * });
 */
export function useGetRecruiterQuery(baseOptions: Apollo.QueryHookOptions<GetRecruiterQuery, GetRecruiterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecruiterQuery, GetRecruiterQueryVariables>(GetRecruiterDocument, options);
      }
export function useGetRecruiterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecruiterQuery, GetRecruiterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecruiterQuery, GetRecruiterQueryVariables>(GetRecruiterDocument, options);
        }
export type GetRecruiterQueryHookResult = ReturnType<typeof useGetRecruiterQuery>;
export type GetRecruiterLazyQueryHookResult = ReturnType<typeof useGetRecruiterLazyQuery>;
export type GetRecruiterQueryResult = Apollo.QueryResult<GetRecruiterQuery, GetRecruiterQueryVariables>;
export const AddVacancyDocument = gql`
    mutation AddVacancy($data: AddVacancyInput!) {
  addVacancy(data: $data) {
    id
  }
}
    `;
export type AddVacancyMutationFn = Apollo.MutationFunction<AddVacancyMutation, AddVacancyMutationVariables>;

/**
 * __useAddVacancyMutation__
 *
 * To run a mutation, you first call `useAddVacancyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVacancyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVacancyMutation, { data, loading, error }] = useAddVacancyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddVacancyMutation(baseOptions?: Apollo.MutationHookOptions<AddVacancyMutation, AddVacancyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddVacancyMutation, AddVacancyMutationVariables>(AddVacancyDocument, options);
      }
export type AddVacancyMutationHookResult = ReturnType<typeof useAddVacancyMutation>;
export type AddVacancyMutationResult = Apollo.MutationResult<AddVacancyMutation>;
export type AddVacancyMutationOptions = Apollo.BaseMutationOptions<AddVacancyMutation, AddVacancyMutationVariables>;
export const GetLocationsDocument = gql`
    query GetLocations {
  getLocations {
    title
    id
  }
}
    `;

/**
 * __useGetLocationsQuery__
 *
 * To run a query within a React component, call `useGetLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLocationsQuery(baseOptions?: Apollo.QueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
      }
export function useGetLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
        }
export type GetLocationsQueryHookResult = ReturnType<typeof useGetLocationsQuery>;
export type GetLocationsLazyQueryHookResult = ReturnType<typeof useGetLocationsLazyQuery>;
export type GetLocationsQueryResult = Apollo.QueryResult<GetLocationsQuery, GetLocationsQueryVariables>;
export const GetSkillsDocument = gql`
    query GetSkills {
  getSkills {
    id
    title
  }
}
    `;

/**
 * __useGetSkillsQuery__
 *
 * To run a query within a React component, call `useGetSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSkillsQuery(baseOptions?: Apollo.QueryHookOptions<GetSkillsQuery, GetSkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSkillsQuery, GetSkillsQueryVariables>(GetSkillsDocument, options);
      }
export function useGetSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSkillsQuery, GetSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSkillsQuery, GetSkillsQueryVariables>(GetSkillsDocument, options);
        }
export type GetSkillsQueryHookResult = ReturnType<typeof useGetSkillsQuery>;
export type GetSkillsLazyQueryHookResult = ReturnType<typeof useGetSkillsLazyQuery>;
export type GetSkillsQueryResult = Apollo.QueryResult<GetSkillsQuery, GetSkillsQueryVariables>;
export const GetBenefitsDocument = gql`
    query GetBenefits {
  getBenefits {
    id
    title
  }
}
    `;

/**
 * __useGetBenefitsQuery__
 *
 * To run a query within a React component, call `useGetBenefitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBenefitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBenefitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBenefitsQuery(baseOptions?: Apollo.QueryHookOptions<GetBenefitsQuery, GetBenefitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBenefitsQuery, GetBenefitsQueryVariables>(GetBenefitsDocument, options);
      }
export function useGetBenefitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBenefitsQuery, GetBenefitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBenefitsQuery, GetBenefitsQueryVariables>(GetBenefitsDocument, options);
        }
export type GetBenefitsQueryHookResult = ReturnType<typeof useGetBenefitsQuery>;
export type GetBenefitsLazyQueryHookResult = ReturnType<typeof useGetBenefitsLazyQuery>;
export type GetBenefitsQueryResult = Apollo.QueryResult<GetBenefitsQuery, GetBenefitsQueryVariables>;