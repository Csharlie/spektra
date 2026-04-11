import { NavigationBar, FooterBlock } from '@spektra/components'
import type { LayoutShellProps } from '@spektra/layouts'

/**
 * App header — maps SiteData to NavigationBar props.
 * This is the DI bridge: template injects SiteData, we render the component.
 */
export function AppHeader({ siteData }: LayoutShellProps) {
  const links = siteData.navigation.primary.map(item => ({
    label: item.label,
    href: item.href,
  }))

  return (
    <NavigationBar
      logoText={siteData.site.name}
      links={links}
      variant="light"
    />
  )
}

/**
 * App footer — maps SiteData to FooterBlock props.
 */
export function AppFooter({ siteData }: LayoutShellProps) {
  const footerLinks = siteData.navigation.footer ?? []

  return (
    <FooterBlock
      logoText={siteData.site.name}
      description={siteData.site.description ?? ''}
      sections={[
        {
          title: 'Navigáció',
          links: siteData.navigation.primary.map(item => ({
            label: item.label,
            href: item.href,
          })),
        },
        ...(footerLinks.length > 0
          ? [{
              title: 'Jogi',
              links: footerLinks.map(item => ({
                label: item.label,
                href: item.href,
              })),
            }]
          : []),
      ]}
      copyright={`© ${new Date().getFullYear()} ${siteData.site.name}`}
    />
  )
}
