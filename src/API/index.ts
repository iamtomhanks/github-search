import { request } from 'graphql-request';

const requestHeaders = {
  authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
};

const githubAPI = async <T = unknown>(query: string) => {
  return request<T>('https://api.github.com/graphql', query, undefined, requestHeaders);
};

export { githubAPI };
