import * as Separator from '@radix-ui/react-separator'
import {SeparatorProps} from '@radix-ui/themes/dist/cjs/components/separator'
import './separator.css'

export default (props: SeparatorProps) => {
  return <Separator.Root className='separator' {...props} />
}
