import * as React from 'react'
import {Card, Flex, Text, Heading} from '@wallet/ui'

interface AccountBalanceProps {
  totalIncome: number
  totalExpenses: number
}

export const AccountBalance: React.FC<AccountBalanceProps> = ({
  totalIncome,
  totalExpenses,
}) => {
  const balance = totalIncome - totalExpenses

  return (
    <Card title="Account Balance">
      <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <Text size="2" color="gray">
            Total Income:
          </Text>
          <Text size="3" weight="bold" style={{color: 'var(--green-11)'}}>
            ${(totalIncome / 100).toFixed(2)}
          </Text>
        </Flex>
        <Flex justify="between" align="center">
          <Text size="2" color="gray">
            Total Expenses:
          </Text>
          <Text size="3" weight="bold" style={{color: 'var(--red-11)'}}>
            ${(totalExpenses / 100).toFixed(2)}
          </Text>
        </Flex>
        <Flex
          justify="between"
          align="center"
          pt="3"
          style={{borderTop: '1px solid var(--gray-6)'}}
        >
          <Text size="3" weight="bold">
            Balance:
          </Text>
          <Heading
            size="6"
            style={{color: balance >= 0 ? 'var(--green-11)' : 'var(--red-11)'}}
          >
            ${(balance / 100).toFixed(2)}
          </Heading>
        </Flex>
      </Flex>
    </Card>
  )
}
