import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { User } from '../Types/Users';
import { githubAPI } from '../API';

const useUserProfile = (username?: string) => {
  const query = useQuery(
    ['user-profile', username],
    async () => {
      const query = gql`
                query {
                    user(login: "${username}") {
                        login
                        avatarUrl
                        email
                        location
                        createdAt
                        bio
                        followers {
                          totalCount
                        }
                        following {
                            totalCount
                        }
                    }
                }
            `;

      const results = await githubAPI<{ user: User }>(query);

      return results.user;
    },
    {
      enabled: username !== undefined && username.length > 0
    }
  );

  return query;
};

export { useUserProfile };
