type JsonRpcResponse<T> = {
  jsonrpc: string;
  id: number | string | null;
  result?: T;
  error?: {code: number; message: string; data?: any};
};

const ODOO_URL = (process.env.ODOO_URL as string | undefined)?.replace(/\/+$/, '');
const ODOO_DB = process.env.ODOO_DB as string | undefined;
const ODOO_USERNAME = process.env.ODOO_USERNAME as string | undefined;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD as string | undefined;

const isOdooConfigured = Boolean(ODOO_URL && ODOO_DB && ODOO_USERNAME && ODOO_PASSWORD);

let uidCache: number | null = null;

async function jsonRpc<T>(endpoint: string, payload: any): Promise<T> {
  if (!ODOO_URL) throw new Error('ODOO_URL is not set');
  const base = ODOO_URL.replace(/\/+$/, '');
  const ep = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const res = await fetch(`${base}${ep}`, {
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
  if (!isOdooConfigured) throw new Error('Odoo is not configured');
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

const devSampleCourses = [
  {
    id: 1,
    title: 'Introducción a la Programación',
    slug: 'intro-programacion',
    description: 'Aprende los fundamentos: variables, control de flujo y funciones.',
    price: 0,
    sections: [{title: 'Variables'}, {title: 'Condicionales'}, {title: 'Funciones'}]
  },
  {
    id: 2,
    title: 'Desarrollo Web con Next.js',
    slug: 'nextjs-web',
    description: 'Crea sitios modernos con React, rutas y API Routes en Next.js.',
    price: 49,
    sections: [{title: 'App Router'}, {title: 'SSR/SSG'}, {title: 'API Routes'}]
  },
  {
    id: 3,
    title: 'Fundamentos de Data Science',
    slug: 'data-science',
    description: 'Pandas, visualización y modelos básicos para análisis de datos.',
    price: 79,
    sections: [{title: 'Pandas'}, {title: 'Visualización'}, {title: 'Modelos'}]
  }
];

export async function fetchCourses(options?: {slug?: string}) {
  if (!isOdooConfigured) {
    if (options?.slug) return devSampleCourses.filter((c) => c.slug === options.slug);
    return devSampleCourses;
  }

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