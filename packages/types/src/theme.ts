/**
 * Theme config típusok.
 * Ezek NEM a Tailwind preset-ek — azok a @spektra/themes package-ben vannak.
 * Ez a runtime-ban használható theme metadata/konfiguráció.
 */

export interface ThemeColors {
  primary: string
  secondary: string
  accent?: string
  background?: string
  foreground?: string
}

export interface ThemeFonts {
  sans?: string
  heading?: string
  mono?: string
}

export interface ThemeConfig {
  name: string
  colors: ThemeColors
  fonts?: ThemeFonts
}
