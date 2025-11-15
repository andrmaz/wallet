import * as React from 'react'
import {Card, Flex, Button, Text} from '@wallet/ui'
import {useLocale} from '@wallet/common'

export const QuickLinks: React.FC = () => {
  const {t} = useLocale()

  const links = [
    {label: 'Add Expense', onClick: () => console.log('Add expense'), icon: '💰'},
    {label: 'Add Income', onClick: () => console.log('Add income'), icon: '💵'},
    {label: 'Set Budget', onClick: () => console.log('Set budget'), icon: '📊'},
    {label: 'Create Goal', onClick: () => console.log('Create goal'), icon: '🎯'},
    {label: 'View Reports', onClick: () => console.log('View reports'), icon: '📈'},
  ]

  return (
    <Card title="Quick Actions">
      <Flex direction="column" gap="2">
        {links.map((link, index) => (
          <Button
            key={index}
            onClick={link.onClick}
            variant="soft"
            style={{
              justifyContent: 'flex-start',
              cursor: 'pointer',
            }}
          >
            <Flex gap="2" align="center">
              <span>{link.icon}</span>
              <Text size="2">{link.label}</Text>
            </Flex>
          </Button>
        ))}
      </Flex>
    </Card>
  )
}
