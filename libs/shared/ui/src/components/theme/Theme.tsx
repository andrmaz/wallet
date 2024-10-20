import {Theme} from '@radix-ui/themes'
import {ThemeProps} from '@radix-ui/themes/dist/cjs/theme'
import '@radix-ui/themes/styles.css'
import '../../css/theme.css'

export default (props: ThemeProps) => {
  return (
    <Theme
      accentColor='orange'
      grayColor='sand'
      panelBackground='translucent'
      {...props}
    />
  )
}
