// Call to content in this fill will be striped in production build.
import { showVariantPrompt } from './controller';
import {
  getAccountVariant,
  getLocalVariant,
  getPageVariant,
  calculatePreferredVariant,
  getBrowserVariant,
  getMediaWikiVariant,
} from './model';
import { isLoggedIn } from './utils';

function showDebugInfo(): void {
  console.log(`[VariantAlly]
Build: ${BUILD_HASH}
Referrer: ${document.referrer || '(empty)'}
Browser variant: ${getBrowserVariant()}
Local variant: ${getLocalVariant()}
Account variant: ${getAccountVariant()}
Page variant: ${getPageVariant()}
MediaWiki variant: ${getMediaWikiVariant()}
User logged in: ${isLoggedIn()}
Calculated preferred variant: ${calculatePreferredVariant()}
`);
}

function output(...outputs: string[]): void {
  console.log(`[VariantAlly] ${outputs.slice(0, -1).join('/')}: ${outputs.pop()}`);
}

function checkDebugURLParam(): void {
  const vaForceDialog = new URL(location.href).searchParams.get('va-force-dialog');
  if (vaForceDialog !== null) {
    showVariantPrompt();
  }
}

export { showDebugInfo, output, checkDebugURLParam };
