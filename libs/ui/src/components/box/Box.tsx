import {Box} from '@radix-ui/themes'
import type {BoxProps as RadixBoxProps} from '@radix-ui/themes/dist/cjs/components/box'

export type BoxProps = RadixBoxProps

export default (props: BoxProps) => {
  return <Box {...props} />
}
