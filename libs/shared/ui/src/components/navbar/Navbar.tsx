import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import {CaretDownIcon} from '@radix-ui/react-icons'
import './navbar.css'

interface NavbarProps {
  items: {
    name: string
    expand: boolean
  }[]
}

export default (props: NavbarProps) => {
  return (
    <NavigationMenu.Root className='navigation-menu-root'>
      <NavigationMenu.List className='navigation-menu-list'>
        {props.items.map(({name, expand}) => (
          <NavigationMenu.Item key={name}>
            <NavigationMenu.Trigger className='navigation-menu-trigger'>
              {name}{' '}
              {expand && <CaretDownIcon className='caret-down' aria-hidden />}
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
        ))}
        <NavigationMenu.Indicator className='navigation-menu-indicator'>
          <div className='arrow' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className='viewport-position'>
        <NavigationMenu.Viewport className='navigation-menu-viewport' />
      </div>
    </NavigationMenu.Root>
  )
}
