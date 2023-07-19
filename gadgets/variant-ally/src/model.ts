import { isLoggedIn } from './utils';

const LOCAL_STORAGE_KEY = 'va-var';
const VALID_VARIANTS = [
  'zh-cn',
  'zh-sg',
  'zh-my',
  'zh-tw',
  'zh-hk',
  'zh-mo',
];

/**
 * Get current variant of the page (don't be misled by config naming).
 * @returns variant, null for non-wikitext page
 */
function getPageVariant(): string | null {
  return mw.config.get('wgUserVariant');
}

/**
 * Get account variant.
 * @returns account variant, null for anonymous user
 */
function getAccountVariant(): string | null {
  if (isLoggedIn()) {
    return mw.user.options.get('variant');
  }
  return null;
}

function getLocalVariant(): string | null {
  const browserVariant = getBrowserVariant();
  const localVariant = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (browserVariant !== null && browserVariant !== localVariant) {
    // Keep local variant in sync with browser variant
    setLocalVariant(browserVariant);
    return browserVariant;
  }
  return localVariant;
}

/**
 * Return browser variant if it's valid.
 * @returns browser variant
 */
function getBrowserVariant(): string | null {
  for (const lang of navigator.languages) {
    const result = lang.toLowerCase();
    if (VALID_VARIANTS.includes(result)) {
      return result;
    }
  }
  return null;
}

/**
 * Get the variant inferred by MediaWiki, if it's valid.
 * @returns variant
 */
function getMediaWikiVariant(): string | null {
  return getAccountVariant() || getBrowserVariant();
}

/**
 * Calculate preferred variant from Special:Preferences (logged-in users)
 * or local storage (anonymous users). Resets local storage if there's a conflict.
 * @returns preferred variant
 */
function calculatePreferredVariant(): string | null {
  const browserVariant = getBrowserVariant();
  const localVariant = getLocalVariant();
  const accountVariant = getAccountVariant();

  if (accountVariant !== null) {
    return accountVariant;
  }

  if (localVariant !== null) {
    return localVariant;
  }

  return browserVariant;
}

function setLocalVariant(variant: string): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, variant);
}

export {
  getPageVariant,
  getAccountVariant,
  getLocalVariant,
  getBrowserVariant,
  getMediaWikiVariant,
  calculatePreferredVariant,
  setLocalVariant,
};