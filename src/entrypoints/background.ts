import type { OpenTabMessage } from './content/messages';

export default defineBackground(() => {
  // Some raw-JSON hosts (e.g. GitHub raw) send a CSP `sandbox` directive with
  // no `allow-popups`, which blocks a page's own script-initiated new-tab
  // links entirely. The background script isn't subject to that page CSP, so
  // route external links through here via `chrome.tabs.create` instead.
  browser.runtime.onMessage.addListener((message: OpenTabMessage) => {
    if (message?.type === 'open-tab') {
      browser.tabs.create({ url: message.url });
    }
  });
});
