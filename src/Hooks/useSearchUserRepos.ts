import { useInfiniteQuery } from 'react-query';
import { gql } from 'graphql-request';
import { Repository } from '../Types/Users';
import { githubAPI } from '../API';

const useSearchUserRepos = (repoSearchTerm: string, username?: string) => {
  const query = useInfiniteQuery(
    ['search-user-repos', username, repoSearchTerm],
    async ({ pageParam = undefined }) => {
      const query = gql`
                query {
                    search(query: "${repoSearchTerm} in:name user:${username}", type: REPOSITORY, first: 10${
        pageParam ? `, after:"${pageParam}"` : ''
      }) {
                      pageInfo {
                        endCursor
                        hasNextPage
                      }  
                      edges {
                          node {
                            ... on Repository {
                                owner {
                                    login
                                }
                                name
                                url
                                forks {
                                    totalCount
                                }
                                stargazers {
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
            node: Repository;
          }[];
        };
      }>(query);

      return {
        repos: edges.map((edge) => edge.node),
        pageInfo
      };
    },
    {
      enabled: username !== undefined && username.length > 0,
      getNextPageParam: (lastPage) =>
        lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined
    }
  );

  return query;
};

export { useSearchUserRepos };
