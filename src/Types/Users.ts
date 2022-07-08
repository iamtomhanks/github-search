export interface Repository {
  name: string;
  url: string;
  forks: {
    totalCount: number;
  };
  stargazers: {
    totalCount: number;
  };
}

export interface User {
  login: string;
  avatarUrl: string;
  email?: string;
  location?: string;
  createdAt?: string;
  bio?: string;
  followers?: {
    totalCount: number;
  };
  following?: {
    totalCount: number;
  };
  repositories?: {
    totalCount: number;
    nodes: Repository[];
  };
}
