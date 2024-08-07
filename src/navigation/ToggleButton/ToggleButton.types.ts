export interface ToggleButtonPropsType {
  size?: number
  top?: number
  bottom?: number
  leftMobile?: number
  leftDesktop?: number
  rightMobile?: number
  rightDesktop?: number
  color?: `#${string}` | `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})` | ''
  buttonHover?: string
  buttonBackgroundColor?: string
  shadow?: boolean
  ariaControls?: string
  ariaExpanded?: boolean
  active: boolean
  setActive: Function
  customClass?: string
}
