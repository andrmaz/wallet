import { GraphQLClient, Variables, RequestDocument } from 'graphql-request'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { getApiUrl } from '../config/env';

/**
 * GraphQL client that handles API requests
 * @param document - GraphQL query or mutation
 * @param variables - Variables for the GraphQL operation
 * @param baseUrl - Optional base URL override (defaults to environment config)
 * @returns Promise with the API response
 */
async function client<T, V extends [Variables]>(
  document: RequestDocument | TypedDocumentNode<T, V>,
  variables: V,
  baseUrl?: string
): Promise<T> {
  const apiUrl = baseUrl || getApiUrl();
  const client = new GraphQLClient(`${apiUrl}/graphql`, {
    credentials: 'include',
    mode: 'cors'
  })
  return client.request(document, ...variables)
}

export { client }
