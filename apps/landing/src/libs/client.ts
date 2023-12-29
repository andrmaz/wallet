import request, { RequestDocument } from 'graphql-request'
import { host, port } from '../data/env'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

async function client<T, Variables>(document: RequestDocument | TypedDocumentNode<T, Variables>): Promise<T> {
  return await request(`http://${host}:${port}/graphql`, document)
}

export { client }
