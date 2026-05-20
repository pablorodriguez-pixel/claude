/**
 * Cliente HubSpot API — Founderz
 * Usa: HUBSPOT_ACCESS_TOKEN en .env
 *
 * Requiere: node-fetch o entorno con fetch nativo (Node 18+)
 */

const BASE_URL = 'https://api.hubapi.com';
const TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

async function hsRequest(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`HubSpot API ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

// ── Contacts ──────────────────────────────────────────────
export const contacts = {
  list: (limit = 10, after) =>
    hsRequest(`/crm/v3/objects/contacts?limit=${limit}${after ? `&after=${after}` : ''}`),

  get: (id, properties = []) =>
    hsRequest(`/crm/v3/objects/contacts/${id}${properties.length ? `?properties=${properties.join(',')}` : ''}`),

  search: (query, properties = ['firstname', 'lastname', 'email']) =>
    hsRequest('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        query,
        properties,
        limit: 20,
      }),
    }),

  create: (properties) =>
    hsRequest('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    }),

  update: (id, properties) =>
    hsRequest(`/crm/v3/objects/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ properties }),
    }),
};

// ── Companies ─────────────────────────────────────────────
export const companies = {
  list: (limit = 10) =>
    hsRequest(`/crm/v3/objects/companies?limit=${limit}`),

  search: (query) =>
    hsRequest('/crm/v3/objects/companies/search', {
      method: 'POST',
      body: JSON.stringify({ query, limit: 20 }),
    }),
};

// ── Deals ─────────────────────────────────────────────────
export const deals = {
  list: (limit = 10) =>
    hsRequest(`/crm/v3/objects/deals?limit=${limit}&properties=dealname,amount,dealstage,closedate`),

  search: (filters) =>
    hsRequest('/crm/v3/objects/deals/search', {
      method: 'POST',
      body: JSON.stringify({ filterGroups: [{ filters }], limit: 20 }),
    }),
};

// ── Forms ─────────────────────────────────────────────────
export const forms = {
  submit: (portalId, formId, fields) =>
    hsRequest(`/submissions/v3/integration/submit/${portalId}/${formId}`, {
      method: 'POST',
      body: JSON.stringify({ fields }),
    }),
};

export default { contacts, companies, deals, forms };
