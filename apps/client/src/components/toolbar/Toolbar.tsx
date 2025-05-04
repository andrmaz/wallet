import * as React from 'react'
import { useLocale } from '@wallet/common'
import {Navbar} from '@wallet/ui'

export const Toolbar = () => {
  const {t} = useLocale()
  const items = React.useMemo(
    () => [
      {name: t('header.navigation.product'), expand: true},
      {name: t('header.navigation.feature'), expand: true},
      {name: t('header.navigation.customer'), expand: false},
      {name: t('header.navigation.blog'), expand: false},
      {name: t('header.navigation.pricing'), expand: true},
    ],
    [t]
  )
  return <Navbar items={items} />
}
