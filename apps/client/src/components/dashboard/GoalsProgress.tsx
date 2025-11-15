import * as React from 'react'
import {Card, Flex, Text} from '@wallet/ui'
import {useLocale} from '@wallet/common'

interface Goal {
  id: number
  description: string
  amount: number
  currentAmount: number
  targetDate: string
}

interface GoalsProgressProps {
  goals: Goal[]
}

export const GoalsProgress: React.FC<GoalsProgressProps> = ({goals}) => {
  const {t} = useLocale()
  
  const sortedGoals = React.useMemo(() => {
    return [...goals].sort(
      (a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
    )
  }, [goals])

  if (sortedGoals.length === 0) {
    return (
      <Card title={t('dashboard.goalsProgress.title')}>
        <Text size="2" color="gray">
          {t('dashboard.goalsProgress.noGoals')}
        </Text>
      </Card>
    )
  }

  return (
    <Card title={t('dashboard.goalsProgress.title')}>
      <Flex direction="column" gap="4">
        {sortedGoals.map((goal) => {
          const percentage =
            goal.amount > 0 ? Math.min((goal.currentAmount / goal.amount) * 100, 100) : 0
          const isAchieved = goal.currentAmount >= goal.amount
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
                  ${(goal.currentAmount / 100).toFixed(2)} / ${(goal.amount / 100).toFixed(2)}
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
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${goal.description} progress: ${percentage.toFixed(1)}%`}
                />
              </div>
              <Flex justify="between" align="center">
                <Text size="1" color="gray">
                  {daysRemaining > 0
                    ? `${daysRemaining} ${t('dashboard.goalsProgress.daysRemaining')}`
                    : t('dashboard.goalsProgress.targetDatePassed')}
                </Text>
                {isAchieved && (
                  <Text size="1" style={{color: 'var(--green-11)'}}>
                    ✓ {t('dashboard.goalsProgress.goalAchieved')}
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
