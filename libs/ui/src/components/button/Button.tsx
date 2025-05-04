import {Button} from '@radix-ui/themes'
import type {ButtonProps} from '@radix-ui/themes/dist/cjs/components/button'

export {ButtonProps}
export default (props: ButtonProps) => {
  return <Button style={{textTransform: 'uppercase'}} {...props} />
}
