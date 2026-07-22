export const buildRequestHeaders = (
  initialHeaders: HeadersInit | undefined,
  body: unknown,
  token: string | null,
): Headers => {
  const requestHeaders = new Headers(initialHeaders);

  if (!requestHeaders.has('Accept')) {
    requestHeaders.set('Accept', 'application/json');
  }

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  if (body !== undefined && !isFormData && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  return requestHeaders;
};
