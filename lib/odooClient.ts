type JsonRpcResponse<T> = {
  jsonrpc: string;
  id: number | string | null;
  result?: T;
  error?: {code: number; message: string; data?: any};
};

const ODOO_URL = process.env.ODOO_URL as string;
const ODOO_DB = process.env.ODOO_DB as string;
const ODOO_USERNAME = process.env.ODOO_USERNAME as string;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD as string;

let uidCache: number | null = null;

async function jsonRpc<T>(endpoint: string, payload: any): Promise<T> {
  const res = await fetch(`${ODOO_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({jsonrpc: '2.0', id: Date.now(), ...payload})
  });
  if (!res.ok) throw new Error(`Odoo RPC HTTP ${res.status}`);
  const data = (await res.json()) as JsonRpcResponse<T>;
  if (data.error) throw new Error(data.error.message);
  return data.result as T;
}

async function authenticate(): Promise<number> {
  if (uidCache) return uidCache;
  const uid = await jsonRpc<number>('/jsonrpc', {
    method: 'call',
    params: {
      service: 'common',
      method: 'authenticate',
      args: [ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, {}]
    }
  });
  uidCache = uid;
  return uid;
}

export async function odooExecuteKw(model: string, method: string, args: any[], kwargs: Record<string, any> = {}) {
  const uid = await authenticate();
  return jsonRpc<any>('/jsonrpc', {
    method: 'call',
    params: {
      service: 'object',
      method: 'execute_kw',
      args: [ODOO_DB, uid, ODOO_PASSWORD, model, method, args, kwargs]
    }
  });
}

export async function fetchCourses(options?: {slug?: string}) {
  const domain: any[] = [];
  if (options?.slug) domain.push(['slug', '=', options.slug]);
  const fields = ['id', 'name', 'slug', 'short_description', 'price', 'sections'];
  const courses = await odooExecuteKw('oa.course', 'search_read', [domain], {fields, limit: 24});
  return (courses || []).map((c: any) => ({
    id: c.id,
    title: c.name,
    slug: c.slug,
    description: c.short_description,
    price: c.price,
    sections: c.sections
  }));
} 