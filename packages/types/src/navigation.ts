/**
 * Navigáció típusok.
 * Az sp-engine-ben Navigation kettős volt: `Navigation | NavItem[]`.
 * Most egységes: Navigation objektum primary + footer csoportokkal.
 */

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  external?: boolean
}

export interface Navigation {
  primary: NavItem[]
  footer?: NavItem[]
}
