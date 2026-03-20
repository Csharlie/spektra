import type { SiteData } from '@spektra/types'

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export type SiteDataValidationResult =
  | { valid: true; data: SiteData }
  | { valid: false; errors: string[] }

/**
 * Runtime validation for SiteData payloads.
 *
 * Ellenőrzi, hogy az ismeretlen input strukturálisan megfelel-e a SiteData
 * contractnak. Nem deep-validálja a section data-t (az section-specifikus),
 * de a teljes outer shape-et: site meta, navigation, pages, sections, media, CTA.
 *
 * Használat:
 *   const result = validateSiteData(unknownPayload)
 *   if (!result.valid) throw new Error(result.errors.join('; '))
 */
export function validateSiteData(input: unknown): SiteDataValidationResult {
  const errors: string[] = []

  if (!isObject(input)) {
    return { valid: false, errors: ['SiteData must be an object'] }
  }

  // --- site ---
  if (!isObject(input.site)) {
    errors.push('SiteData.site must be an object')
  } else {
    if (typeof input.site.name !== 'string') {
      errors.push('SiteData.site.name must be a string')
    }
    assertOptionalString(input.site, 'description', 'site', errors)
    assertOptionalString(input.site, 'url', 'site', errors)
    assertOptionalString(input.site, 'locale', 'site', errors)
  }

  // --- navigation ---
  if (!isObject(input.navigation)) {
    errors.push('SiteData.navigation must be an object')
  } else {
    if (!Array.isArray(input.navigation.primary)) {
      errors.push('SiteData.navigation.primary must be an array')
    } else {
      validateNavItems(input.navigation.primary, 'navigation.primary', errors)
    }
    if (input.navigation.footer !== undefined) {
      if (!Array.isArray(input.navigation.footer)) {
        errors.push('SiteData.navigation.footer must be an array')
      } else {
        validateNavItems(input.navigation.footer, 'navigation.footer', errors)
      }
    }
  }

  // --- pages ---
  if (!Array.isArray(input.pages)) {
    errors.push('SiteData.pages must be an array')
  } else if (input.pages.length === 0) {
    errors.push('SiteData.pages must contain at least one page')
  } else {
    for (let i = 0; i < input.pages.length; i++) {
      validatePage(input.pages[i], `pages[${i}]`, errors)
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  return { valid: true, data: input as unknown as SiteData }
}

// ---------------------------------------------------------------------------
// Internal validators
// ---------------------------------------------------------------------------

function validateNavItems(
  items: unknown[],
  path: string,
  errors: string[],
): void {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const p = `${path}[${i}]`
    if (!isObject(item)) {
      errors.push(`${p} must be an object`)
      continue
    }
    if (typeof item.label !== 'string') errors.push(`${p}.label must be a string`)
    if (typeof item.href !== 'string') errors.push(`${p}.href must be a string`)
    if (item.children !== undefined) {
      if (!Array.isArray(item.children)) {
        errors.push(`${p}.children must be an array`)
      } else {
        validateNavItems(item.children, `${p}.children`, errors)
      }
    }
  }
}

function validatePage(
  page: unknown,
  path: string,
  errors: string[],
): void {
  if (!isObject(page)) {
    errors.push(`${path} must be an object`)
    return
  }
  if (typeof page.slug !== 'string') {
    errors.push(`${path}.slug must be a string`)
  }
  if (!Array.isArray(page.sections)) {
    errors.push(`${path}.sections must be an array`)
  } else {
    for (let i = 0; i < page.sections.length; i++) {
      validateSection(page.sections[i], `${path}.sections[${i}]`, errors)
    }
  }
  if (page.meta !== undefined) {
    validatePageMeta(page.meta, `${path}.meta`, errors)
  }
}

function validatePageMeta(
  meta: unknown,
  path: string,
  errors: string[],
): void {
  if (!isObject(meta)) {
    errors.push(`${path} must be an object`)
    return
  }
  assertOptionalString(meta, 'title', path, errors)
  assertOptionalString(meta, 'description', path, errors)
  assertOptionalString(meta, 'canonical', path, errors)
  if (meta.ogImage !== undefined) {
    validateMedia(meta.ogImage, `${path}.ogImage`, errors)
  }
}

function validateSection(
  section: unknown,
  path: string,
  errors: string[],
): void {
  if (!isObject(section)) {
    errors.push(`${path} must be an object`)
    return
  }
  if (typeof section.id !== 'string') {
    errors.push(`${path}.id must be a string`)
  }
  if (typeof section.type !== 'string') {
    errors.push(`${path}.type must be a string`)
  }
  if (section.data === undefined || section.data === null) {
    errors.push(`${path}.data must be defined`)
  }
}

function validateMedia(
  media: unknown,
  path: string,
  errors: string[],
): void {
  if (!isObject(media)) {
    errors.push(`${path} must be an object`)
    return
  }
  if (typeof media.src !== 'string') {
    errors.push(`${path}.src must be a string`)
  }
  if (typeof media.alt !== 'string') {
    errors.push(`${path}.alt must be a string`)
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x)
}

function assertOptionalString(
  obj: Record<string, unknown>,
  key: string,
  parentPath: string,
  errors: string[],
): void {
  if (obj[key] !== undefined && typeof obj[key] !== 'string') {
    errors.push(`${parentPath}.${key} must be a string`)
  }
}
