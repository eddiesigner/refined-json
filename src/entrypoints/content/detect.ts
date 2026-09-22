const JSON_CONTENT_TYPE = /^(application|text)\/([a-z0-9.-]+\+)?json$/i;

// Raw-file hosts (GitHub, jsDelivr, unpkg, GitLab, ...) intentionally serve
// .json files under an ambiguous content type plus `X-Content-Type-Options:
// nosniff`, to stop browsers from executing untrusted content. Trust the URL
// extension only for these known-ambiguous types, not for arbitrary ones.
const AMBIGUOUS_CONTENT_TYPE = /^(text\/plain|application\/octet-stream)$/i;

export function isJsonDocument(contentType: string, url: string): boolean {
  const mimeType = contentType.split(';', 1)[0]?.trim() ?? '';
  if (JSON_CONTENT_TYPE.test(mimeType)) {
    return true;
  }
  return AMBIGUOUS_CONTENT_TYPE.test(mimeType) && /\.json$/i.test(new URL(url).pathname);
}

// Raw JSON documents are normally rendered by the browser as a single <pre>
// holding the exact response body. Some browsers (e.g. Firefox) replace that
// with their own JSON viewer instead, so fall back to re-fetching the URL
// verbatim to recover the original text in that case.
export async function readRawJsonText(): Promise<string | null> {
  const { body } = document;
  const onlyChild = body.children.length === 1 ? body.firstElementChild : null;
  if (onlyChild?.tagName === 'PRE') {
    return onlyChild.textContent ?? '';
  }

  try {
    const response = await fetch(location.href, { credentials: 'include' });
    return await response.text();
  } catch {
    return null;
  }
}
