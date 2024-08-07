export type ResponsiveOptions = 'default' | 'md' | 'lg' | 'xl' | 'xxl'
export type ResponsiveType<T> = {
  [key in ResponsiveOptions]?: T
}

export interface menuItemsArrayPropsTypes {
  id: number
  label?: string
  link: string
}

export interface NavBarPropsTypes {
  menuItemsArray?: menuItemsArrayPropsTypes[]
  logo?: string
  height?: number
  width?: number
  logoHeight?: string
  logoMargin?: string
  primaryColor?: string
  secondaryColor?: string
  hoverColor?: string
  pressColor?: string
  labelColor?: string
}
