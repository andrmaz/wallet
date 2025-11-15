import { graphql, client } from '@wallet/common'
import { useQuery } from "@tanstack/react-query"

/**
 * Hook to fetch dashboard data for a user's account
 * Includes account info, expenses, incomes, budgets, and goals
 */
export const useDashboardDataQuery = (accountId: number) => {
  const DashboardQuery = graphql(`query GetDashboardData($where: AccountWhereUniqueInput!) {
    account(where: $where) {
      id
      name
      incomes {
        id
        amount
        description
        creditDate
      }
      expenses {
        id
        amount
        description
        debitDate
        category {
          id
          name
        }
      }
      budgets {
        id
        amount
        category {
          id
          name
        }
      }
      goals {
        id
        description
        amount
        targetDate
      }
    }
  }`)

  return useQuery({
    queryKey: ['dashboard', DashboardQuery, accountId],
    queryFn: async () => await client(DashboardQuery, [{ where: { id: accountId } }]),
    enabled: accountId > 0,
  })
}
