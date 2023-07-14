import { User, Session } from 'next-auth'

export type ArticleState = {
    title: string;
    image: string;
    category: string;
    body: string;
};

export interface ArticleInterface {
    title: string;
    body: string;
    image: string;
    category: string;
    id: string;
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    journalist: boolean;
    avatarUrl: string;
    articles: {
      edges: { node: ArticleInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ArticleForm {
  title: string;
  image: string;
  body: string;
  category: string;
}