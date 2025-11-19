import * as React from 'react'
import {Card, Flex, Text} from '@wallet/ui'
import {useLocale} from '@wallet/common'

interface Expense {
  id: number
  amount: number
  category: {
    id: number
    name: string
  }
}

interface SpendingChartProps {
  expenses: Expense[]
}

const CATEGORY_COLORS = [
  'var(--blue-9)',
  'var(--green-9)',
  'var(--orange-9)',
  'var(--purple-9)',
  'var(--red-9)',
  'var(--yellow-9)',
  'var(--cyan-9)',
  'var(--pink-9)',
]

export const SpendingChart: React.FC<SpendingChartProps> = ({expenses}) => {
  const {t} = useLocale()
  
  const spendingByCategory = React.useMemo(() => {
    const result: Record<string, number> = {}
    expenses.forEach((expense) => {
      const categoryName = expense.category.name
      result[categoryName] = (result[categoryName] || 0) + expense.amount
    })

    // Convert to array and sort by amount
    return Object.entries(result)
      .map(([name, amount]) => ({name, amount}))
      .sort((a, b) => b.amount - a.amount)
  }, [expenses])

  const totalSpending = React.useMemo(() => {
    return spendingByCategory.reduce((sum, item) => sum + item.amount, 0)
  }, [spendingByCategory])

  if (spendingByCategory.length === 0) {
    return (
      <Card title={t('dashboard.spendingChart.title')}>
        <Text size="2" color="gray">
          {t('dashboard.spendingChart.noExpenses')}
        </Text>
      </Card>
    )
  }

  return (
    <Card title={t('dashboard.spendingChart.title')}>
      <Flex direction="column" gap="3">
        {/* Simple bar chart */}
        {spendingByCategory.map((item, index) => {
          const percentage =
            totalSpending > 0 ? (item.amount / totalSpending) * 100 : 0

          return (
            <Flex key={item.name} direction="column" gap="1">
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">
                  {item.name}
                </Text>
                <Text size="2" color="gray">
                  ${(item.amount / 100).toFixed(2)} ({percentage.toFixed(1)}%)
                </Text>
              </Flex>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'var(--gray-4)',
                  borderRadius: 'var(--radius-2)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                    transition: 'width 0.3s ease',
                  }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${item.name}: ${percentage.toFixed(1)}% of total spending`}
                />
              </div>
            </Flex>
          )
        })}
        <Flex
          justify="between"
          align="center"
          pt="3"
          style={{borderTop: '1px solid var(--gray-6)'}}
        >
          <Text size="2" weight="bold">
            {t('dashboard.spendingChart.totalSpending')}
          </Text>
          <Text size="3" weight="bold">
            ${(totalSpending / 100).toFixed(2)}
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}
