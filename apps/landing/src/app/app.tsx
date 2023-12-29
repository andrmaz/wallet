import * as React from 'react'
import {Accordion, Query} from '@wallet/shared-ui'
import {useGetUsersQuery} from '../hooks/user'

function App() {
  const result = useGetUsersQuery()
  return (
    <Query result={result}>
      {data => {
        return (
          <>
            <Accordion />
            {JSON.stringify(data.allUsers[0].name, null, 2)}
          </>
        )
      }}
    </Query>
  )
}

export default App
