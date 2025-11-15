import * as React from 'react'
import {Card, Flex, Text} from '@wallet/ui'

interface Budget {
  id: number
  amount: number
  category: {
    id: number
    name: string
  }
}

interface Expense {
  id: number
  amount: number
  category: {
    id: number
    name: string
  }
}

interface BudgetProgressProps {
  budgets: Budget[]
  expenses: Expense[]
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({
  budgets,
  expenses,
}) => {
  // Calculate spending by category
  const spendingByCategory = React.useMemo(() => {
    const result: Record<number, number> = {}
    expenses.forEach((expense) => {
      const categoryId = expense.category.id
      result[categoryId] = (result[categoryId] || 0) + expense.amount
    })
    return result
  }, [expenses])

  // Combine budgets with spending
  const budgetData = React.useMemo(() => {
    return budgets.map((budget) => {
      const spent = spendingByCategory[budget.category.id] || 0
      const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0
      return {
        categoryName: budget.category.name,
        budgeted: budget.amount,
        spent,
        percentage: Math.min(percentage, 100),
        overBudget: spent > budget.amount,
      }
    })
  }, [budgets, spendingByCategory])

  if (budgetData.length === 0) {
    return (
      <Card title="Budget vs Spending">
        <Text size="2" color="gray">
          No budgets set. Create a budget to track your spending.
        </Text>
      </Card>
    )
  }

  return (
    <Card title="Budget vs Spending">
      <Flex direction="column" gap="4">
        {budgetData.map((item, index) => (
          <Flex key={index} direction="column" gap="2">
            <Flex justify="between" align="center">
              <Text size="2" weight="medium">
                {item.categoryName}
              </Text>
              <Text size="2" color="gray">
                ${(item.spent / 100).toFixed(2)} / ${(item.budgeted / 100).toFixed(2)}
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
                  width: `${item.percentage}%`,
                  height: '100%',
                  backgroundColor: item.overBudget
                    ? 'var(--red-9)'
                    : 'var(--green-9)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            {item.overBudget && (
              <Text size="1" style={{color: 'var(--red-11)'}}>
                Over budget by ${((item.spent - item.budgeted) / 100).toFixed(2)}
              </Text>
            )}
          </Flex>
        ))}
      </Flex>
    </Card>
  )
}
