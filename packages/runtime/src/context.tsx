import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import type { SiteData, SiteDataAdapter } from '@spektra/types'

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface SiteDataState {
  data: SiteData | null
  loading: boolean
  error: Error | null
}

const initialState: SiteDataState = {
  data: null,
  loading: true,
  error: null,
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const SiteDataContext = createContext<SiteDataState>(initialState)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface SiteDataProviderProps {
  adapter: SiteDataAdapter
  children: ReactNode
}

/**
 * SiteDataProvider — adapter.load()-ot hívja mount-kor,
 * és SiteData-t ad a component tree-nek context-en keresztül.
 */
export function SiteDataProvider({ adapter, children }: SiteDataProviderProps) {
  const [state, setState] = useState<SiteDataState>(initialState)

  useEffect(() => {
    let cancelled = false

    setState({ data: null, loading: true, error: null })

    adapter
      .load()
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null })
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const error =
            err instanceof Error ? err : new Error(String(err))
          setState({ data: null, loading: false, error })
          adapter.onError?.(error)
        }
      })

    return () => {
      cancelled = true
    }
  }, [adapter])

  return (
    <SiteDataContext.Provider value={state}>
      {children}
    </SiteDataContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * useSiteData — a SiteDataProvider-ből olvassa az aktuális state-et.
 *
 * Használat:
 *   const { data, loading, error } = useSiteData()
 */
export function useSiteData(): SiteDataState {
  return useContext(SiteDataContext)
}
