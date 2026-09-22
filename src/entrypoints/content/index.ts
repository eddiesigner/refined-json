import { createApp } from 'vue';
import App from './App.vue';
import { isJsonDocument, readRawJsonText } from './detect';
import type { JsonValue } from './jsonValue';
import './style.css';

export default defineContentScript({
  matches: ['http://*/*', 'https://*/*', 'file:///*'],
  runAt: 'document_end',
  async main() {
    if (!isJsonDocument(document.contentType, location.href)) {
      return;
    }

    const rawText = await readRawJsonText();
    if (rawText === null) {
      return;
    }

    let data: JsonValue;
    try {
      data = JSON.parse(rawText);
    } catch {
      return;
    }

    if (!document.documentElement.lang) {
      document.documentElement.lang = 'en';
    }
    if (!document.title) {
      document.title = location.pathname.split('/').filter(Boolean).pop() || location.hostname;
    }

    document.body.replaceChildren();
    const container = document.createElement('div');
    document.body.appendChild(container);
    createApp(App, { rawText, data }).mount(container);
  },
});
