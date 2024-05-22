import request, { RequestDocument, Variables } from 'graphql-request'
import { host, port } from '../data/env'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

async function client<T, V extends Variables | undefined>(document: RequestDocument | TypedDocumentNode<T, V>, variables: V): Promise<T> {
  return await request(`http://${host}:${port}/graphql`, document, variables)
}

export { client }
