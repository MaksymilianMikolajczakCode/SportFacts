export const createArticleMutation = `
	mutation CreateArticle($input: ArticleCreateInput!) {
		articleCreate(input: $input) {
			article {
				id
				title
				body
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const updateArticleMutation = `
	mutation UpdateArticle($id: ID!, $input: ArticleUpdateInput!) {
		articleUpdate(by: { id: $id }, input: $input) {
			article {
				id
				title
				body
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deleteArticleMutation = `
  mutation DeleteArticle($id: ID!) {
    articleDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
      
export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				journalist
				id
			}
		}
	}
`;

export const articlesQuery = `
  query getArticles($category: String, $endCursor: String) {
    articleSearch(first: 8, after: $endCursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          body
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getArticleByIdQuery = `
  query GetArticleById($id: ID!) {
    article(by: { id: $id }) {
      id
      title
      body
      image
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      journalist
    }
  }
`;
      
export const getArticlesOfUserQuery = `
  query getUserArticles($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      journalist
      articles(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;