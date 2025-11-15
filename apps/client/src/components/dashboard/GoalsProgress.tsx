import * as React from 'react'
import {Card, Flex, Text} from '@wallet/ui'

interface Goal {
  id: number
  description: string
  amount: number
  targetDate: string
}

interface GoalsProgressProps {
  goals: Goal[]
  currentBalance: number
}

export const GoalsProgress: React.FC<GoalsProgressProps> = ({
  goals,
  currentBalance,
}) => {
  const sortedGoals = React.useMemo(() => {
    return [...goals].sort(
      (a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
    )
  }, [goals])

  if (sortedGoals.length === 0) {
    return (
      <Card title="Financial Goals">
        <Text size="2" color="gray">
          No goals set. Create a goal to track your progress.
        </Text>
      </Card>
    )
  }

  return (
    <Card title="Financial Goals">
      <Flex direction="column" gap="4">
        {sortedGoals.map((goal) => {
          const percentage =
            goal.amount > 0 ? Math.min((currentBalance / goal.amount) * 100, 100) : 0
          const isAchieved = currentBalance >= goal.amount
          const daysRemaining = Math.ceil(
            (new Date(goal.targetDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )

          return (
            <Flex key={goal.id} direction="column" gap="2">
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">
                  {goal.description}
                </Text>
                <Text size="2" color="gray">
                  ${(currentBalance / 100).toFixed(2)} / ${(goal.amount / 100).toFixed(2)}
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
                    backgroundColor: isAchieved ? 'var(--green-9)' : 'var(--blue-9)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <Flex justify="between" align="center">
                <Text size="1" color="gray">
                  {daysRemaining > 0
                    ? `${daysRemaining} days remaining`
                    : 'Target date passed'}
                </Text>
                {isAchieved && (
                  <Text size="1" style={{color: 'var(--green-11)'}}>
                    ✓ Goal achieved!
                  </Text>
                )}
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Card>
  )
}
