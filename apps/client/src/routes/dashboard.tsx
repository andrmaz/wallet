import * as React from 'react'
import {Flex, Box, Heading, Text} from '@wallet/ui'
import {useLocale} from '@wallet/common'
import {useDashboardDataQuery} from '../graphql/dashboard'
import {
  AccountBalance,
  BudgetProgress,
  GoalsProgress,
  QuickLinks,
  SpendingChart,
} from '../components/dashboard'

export default function Dashboard() {
  const {t} = useLocale()
  // For now, we'll use accountId 1 as a default
  // In a real app, this would come from user context/session
  const accountId = 1
  const {data, isLoading, error} = useDashboardDataQuery(accountId)

  // Calculate totals using hooks - these must be called before any conditional returns
  // to comply with React's Rules of Hooks (hooks must be called in the same order every render)
  const account = data?.account
  
  const totalIncome = React.useMemo(
    () => account?.incomes?.reduce((sum, income) => sum + income.amount, 0) || 0,
    [account?.incomes]
  )

  const totalExpenses = React.useMemo(
    () => account?.expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0,
    [account?.expenses]
  )

  // Reusable grid style for dashboard sections
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 'var(--space-4)',
  }

  if (isLoading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <Text>{t('dashboard.loading')}</Text>
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex height="100%" align="center" justify="center">
        <Text color="red">{t('dashboard.error')}</Text>
      </Flex>
    )
  }

  if (!account) {
    return (
      <Flex height="100%" align="center" justify="center">
        <Text>{t('dashboard.noData')}</Text>
      </Flex>
    )
  }

  return (
    <Flex direction="column" p="6" gap="6" style={{maxWidth: '1400px', margin: '0 auto'}}>
      <Box>
        <Heading size="8" mb="2">
          {t('dashboard.title')}
        </Heading>
        <Text size="3" color="gray">
          {account.name}
        </Text>
      </Box>

      {/* Main grid layout */}
      <div style={gridStyle}>
        <AccountBalance totalIncome={totalIncome} totalExpenses={totalExpenses} />
        <QuickLinks />
      </div>

      <div style={gridStyle}>
        <BudgetProgress budgets={account.budgets || []} expenses={account.expenses || []} />
        <GoalsProgress goals={account.goals || []} />
      </div>

      <SpendingChart expenses={account.expenses || []} />
    </Flex>
  )
}
