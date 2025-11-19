import * as React from 'react'
import {Card, Flex, Button, Text} from '@wallet/ui'
import {useLocale} from '@wallet/common'

export const QuickLinks: React.FC = () => {
  const {t} = useLocale()

  const links = [
    {label: t('dashboard.quickLinks.addExpense'), onClick: () => console.log('Add expense'), icon: '💰'},
    {label: t('dashboard.quickLinks.addIncome'), onClick: () => console.log('Add income'), icon: '💵'},
    {label: t('dashboard.quickLinks.setBudget'), onClick: () => console.log('Set budget'), icon: '📊'},
    {label: t('dashboard.quickLinks.createGoal'), onClick: () => console.log('Create goal'), icon: '🎯'},
    {label: t('dashboard.quickLinks.viewReports'), onClick: () => console.log('View reports'), icon: '📈'},
  ]

  return (
    <Card title={t('dashboard.quickLinks.title')}>
      <Flex direction="column" gap="2">
        {links.map((link) => (
          <Button
            key={link.label}
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
