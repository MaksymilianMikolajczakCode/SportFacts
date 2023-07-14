import { ArticleForm } from "@/common.types";
import { createArticleMutation, createUserMutation, deleteArticleMutation, getArticleByIdQuery, getArticlesOfUserQuery, getUserQuery, articlesQuery, updateArticleMutation } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql'
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein'
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000/'
const client = new GraphQLClient(apiUrl)

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables)
    } catch (error) {
        throw error
    }
}

export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, {email})
}

export const createUser = (name:string, email: string, avatarUrl:string, journalist: string) => {
    client.setHeader("x-api-key", apiKey);
    const variables = { input: {
        name, email, avatarUrl, journalist
    }}
    return makeGraphQLRequest(createUserMutation,variables)
}

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`)
        return response.json()
    } catch (error) {
        throw error
    }
}

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({path: imagePath})
        })
        return response.json()
    } catch (error) {
        throw error
    }
}

export const createNewArticle = async (form: ArticleForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url) {
        client.setHeader("Authorization", `Bearer ${token}`)

        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        }
        return makeGraphQLRequest(createArticleMutation, variables)
    }
}

export const fetchAllArticles = async (category?: string, endCursor?: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(articlesQuery, { category, endCursor})
}

export const getArticleDetails = (id: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getArticleByIdQuery,  {id})
}

export const getUserArticles = (id: string, last?: number) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getArticlesOfUserQuery,  {id, last})
}

export const deleteArticle = (id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`)
    return makeGraphQLRequest(deleteArticleMutation, {id})
}

export const updateArticle = async (form: ArticleForm, articleId: string, token: string) => {
    function isBase64DataURL(value: string) {
      const base64Regex = /^data:image\/[a-z]+;base64,/;
      return base64Regex.test(value);
    }
  
    let updatedForm = { ...form };
  
    const isUploadingNewImage = isBase64DataURL(form.image);
  
    if (isUploadingNewImage) {
      const imageUrl = await uploadImage(form.image);
  
      if (imageUrl.url) {
        updatedForm = { ...updatedForm, image: imageUrl.url };
      }
    }
  
    client.setHeader("Authorization", `Bearer ${token}`);
  
    const variables = {
      id: articleId,
      input: updatedForm,
    };
  
    return makeGraphQLRequest(updateArticleMutation, variables);
  };