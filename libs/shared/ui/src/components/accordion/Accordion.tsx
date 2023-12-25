import * as Accordion from '@radix-ui/react-accordion'
import {ChevronDownIcon} from '@radix-ui/react-icons'
import './accordion.css'

export default () => (
  <Accordion.Root type='single' collapsible className='accordion-root'>
    <Accordion.Item value='item-1' className='accordion-item'>
      <Accordion.Header className='accordion-header'>
        <Accordion.Trigger className='accordion-trigger'>
          <span>Trigger text</span>
          <ChevronDownIcon className='accordion-chevron' aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className='accordion-content'>
        <div className='accordion-content-text'>
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
)
