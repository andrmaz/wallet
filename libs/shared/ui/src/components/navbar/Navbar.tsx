import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import {CaretDownIcon} from '@radix-ui/react-icons'
import './navbar.css'

export default () => {
  return (
    <NavigationMenu.Root className='navigation-menu-root'>
      <NavigationMenu.List className='navigation-menu-list'>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='navigation-menu-trigger'>
            Product <CaretDownIcon className='caret-down' aria-hidden />
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='navigation-menu-trigger'>
            Features <CaretDownIcon className='caret-down' aria-hidden />
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='navigation-menu-trigger'>
            Customers
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='navigation-menu-trigger'>
            Blog
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='navigation-menu-trigger'>
            Pricing <CaretDownIcon className='caret-down' aria-hidden />
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>

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
