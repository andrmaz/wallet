import * as React from 'react'
import {useQuery} from '@tanstack/react-query'
import invariant from 'tiny-invariant'

type UseQueryResult<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends readonly unknown[]
> = ReturnType<typeof useQuery<TQueryFnData, TError, TData, TQueryKey>>

export function Query<
  TQueryFnData,
  TError extends Error,
  TData,
  TQueryKey extends readonly unknown[]
>({
  result: {status, data, error},
  children,
}: {
  result: UseQueryResult<TQueryFnData, TError, TData, TQueryKey>
  children: (data: TData) => React.ReactNode
}): JSX.Element | null {
  if (status === 'error') {
    invariant(error != null, 'Error should be present here')
    return <p data-testid='error'>ERROR: {error.message}</p>
  }
  if (status === 'pending') {
    return <p>Loading...</p>
  }
  if (status === 'success') {
    invariant(data !== undefined, 'Data should be present here')
    return <>{children(data)}</>
  }
  return null
}
