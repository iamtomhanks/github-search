import { useInfiniteQuery } from 'react-query';
import { gql } from 'graphql-request';
import { User } from '../Types/Users';
import { githubAPI } from '../API';

const useSearchUsers = (term: string) => {
  const query = useInfiniteQuery(
    ['search-users', term],
    async ({ pageParam = undefined }) => {
      const query = gql`
                query {
                    search(query: "${term} in:login", type: USER, first: 10${
        pageParam ? `, after:"${pageParam}"` : ''
      }) {
                        pageInfo {
                          endCursor
                          hasNextPage
                        }
                        edges {
                          node {
                            ... on User {
                              login
                              avatarUrl
                              repositories {
                                totalCount
                              }
                            }
                          }
                        }
                      }
                }
            `;

      const {
        search: { edges, pageInfo }
      } = await githubAPI<{
        search: {
          pageInfo: {
            endCursor: number;
            hasNextPage: boolean;
          };
          edges: {
            node: User;
          }[];
        };
      }>(query);

      return {
        users: edges.map((edge) => edge.node),
        pageInfo
      };
    },
    {
      enabled: term.length > 0,
      getNextPageParam: (lastPage) =>
        lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined
    }
  );

  return query;
};

export { useSearchUsers };
