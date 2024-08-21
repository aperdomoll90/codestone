export type ResponsiveOptions = 'default' | 'md' | 'lg' | 'xl' | 'xxl'
export type ResponsiveType<T> = {
  [key in ResponsiveOptions]?: T
}

export interface menuItemsArrayPropsTypes {
  label?: string
  link: string
}

export interface ResponsiveNavPropsTypes {
  menuItemsArray: menuItemsArrayPropsTypes[]
  logo?:string
  height?: number
  width?: number
  logoHeight?: number
  logoMargin?: number
  primaryColor?: string
  secondaryColor?: string
  hoverColor?: string
  pressColor?: string
  labelColor?: string
}


export const menuItemsArray: menuItemsArrayPropsTypes[] = [
  {
    label: 'Home',
    link: '#',
  },
  {
    label: 'About',
    link: '#',
  },
  {
    label: 'Portfolio',
    link: '#',
  },
  {
    label: 'Resume',
    link: '#',
  },
]