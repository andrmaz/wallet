import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import './dropdown.css'

interface DropdownProps extends React.PropsWithChildren {
  label: string
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (props, ref) => {
    return (
      <div ref={ref}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button>{props.label}</button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className='dropdown-menu-content'
              sideOffset={5}
            >
              <DropdownMenu.Item className='dropdown-menu-item'>
                {props.children}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    )
  }
)

export default Dropdown
