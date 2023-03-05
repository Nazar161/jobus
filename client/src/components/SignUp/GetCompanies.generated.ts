import * as Types from '../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCompaniesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCompaniesQuery = { __typename?: 'Query', getCompanies?: Array<{ __typename?: 'Company', id: string, name: string }> | null };

export type SelectCompanyMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
  companyId: Types.Scalars['ID'];
}>;


export type SelectCompanyMutation = { __typename?: 'Mutation', selectCompany: { __typename: 'User' } };


export const GetCompaniesDocument = gql`
    query GetCompanies {
  getCompanies {
    id
    name
  }
}
    `;

/**
 * __useGetCompaniesQuery__
 *
 * To run a query within a React component, call `useGetCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
      }
export function useGetCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
        }
export type GetCompaniesQueryHookResult = ReturnType<typeof useGetCompaniesQuery>;
export type GetCompaniesLazyQueryHookResult = ReturnType<typeof useGetCompaniesLazyQuery>;
export type GetCompaniesQueryResult = Apollo.QueryResult<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const SelectCompanyDocument = gql`
    mutation SelectCompany($userId: ID!, $companyId: ID!) {
  selectCompany(userId: $userId, companyId: $companyId) {
    __typename
  }
}
    `;
export type SelectCompanyMutationFn = Apollo.MutationFunction<SelectCompanyMutation, SelectCompanyMutationVariables>;

/**
 * __useSelectCompanyMutation__
 *
 * To run a mutation, you first call `useSelectCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectCompanyMutation, { data, loading, error }] = useSelectCompanyMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useSelectCompanyMutation(baseOptions?: Apollo.MutationHookOptions<SelectCompanyMutation, SelectCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SelectCompanyMutation, SelectCompanyMutationVariables>(SelectCompanyDocument, options);
      }
export type SelectCompanyMutationHookResult = ReturnType<typeof useSelectCompanyMutation>;
export type SelectCompanyMutationResult = Apollo.MutationResult<SelectCompanyMutation>;
export type SelectCompanyMutationOptions = Apollo.BaseMutationOptions<SelectCompanyMutation, SelectCompanyMutationVariables>;