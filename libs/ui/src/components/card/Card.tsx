import * as React from 'react'
import {Box} from '../box'
import {Heading} from '../heading'
import type {BoxProps} from '../box'

export interface CardProps extends BoxProps {
  title?: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({title, children, ...props}) => {
  return (
    <Box
      p="4"
      {...props}
      style={{
        border: '1px solid var(--gray-6)',
        borderRadius: 'var(--radius-3)',
        backgroundColor: 'var(--color-panel)',
        ...(props.style ?? {}),
      }}
    >
      {title && (
        <Heading size="4" mb="3">
          {title}
        </Heading>
      )}
      {children}
    </Box>
  )
}
