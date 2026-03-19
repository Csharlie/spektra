import { createJsonAdapter } from '@spektra/data'
import { SiteDataProvider } from '@spektra/runtime'
import { LandingTemplate } from '@spektra/templates'
import { registry } from './registry'
import { AppHeader, AppFooter } from './shell'
import { demoSiteData } from './data'

const adapter = createJsonAdapter({ data: demoSiteData })

export default function App() {
  return (
    <SiteDataProvider adapter={adapter}>
      <LandingTemplate
        registry={registry}
        header={AppHeader}
        footer={AppFooter}
        fallback={(type) => (
          <div className="p-8 text-center text-gray-400">
            Ismeretlen szekció: {type}
          </div>
        )}
        loading={
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg text-gray-500">Betöltés…</p>
          </div>
        }
      />
    </SiteDataProvider>
  )
}
