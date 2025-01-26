import { GraphQLClient, Variables, RequestDocument } from 'graphql-request'
import { host, port } from '../data/env'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

async function client<T, V extends Variables | undefined>(document: RequestDocument | TypedDocumentNode<T, V>, variables?: V): Promise<T> {
  const client = new GraphQLClient(`http://${host}:${port}/graphql`, {
    credentials: 'include',
    mode: 'cors'
  })
  return client.request(document, variables)
}

export { client }
