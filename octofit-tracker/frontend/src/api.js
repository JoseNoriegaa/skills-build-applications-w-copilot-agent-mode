const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const hasCodespaceApi = Boolean(codespaceName);
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export async function fetchCollection(component, endpoint) {
  const response = await fetch(endpoint || `${apiBaseUrl}/${component}/`);

  if (!response.ok) {
    throw new Error(`Unable to load ${component} (${response.status})`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
}
