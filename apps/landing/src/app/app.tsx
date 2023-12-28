import * as React from 'react'
import {Accordion} from '@wallet/shared-ui'
import {graphql} from '@wallet/shared-gql'
import {useQuery} from '@tanstack/react-query'
import request from 'graphql-request'
import {API_URL} from '../data/constant'

const query = graphql(
  'query GetUsers {\n  allUsers {\n    id\n    name\n    email\n  }\n}'
)

async function queryFn() {
  return await request(API_URL, query)
}

function App() {
  const {data, isError, isLoading, error} = useQuery({
    queryKey: ['user'],
    queryFn,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error : {error.message}</p>
  return (
    <div>
      <Accordion />
      {JSON.stringify(data?.allUsers[0].name, null, 2)}
    </div>
  )
}

export default App
