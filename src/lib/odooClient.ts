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
  if (data.error) {
    const detail = data.error?.data?.message || data.error?.data?.name || data.error?.message || 'Odoo Server Error';
    throw new Error(detail);
  }
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

// Helper function to create slug from name and id
function createSlug(name: string, id: number): string {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${id}`;
}

export async function fetchCourses(options?: {slug?: string}) {
  if (!isOdooConfigured) {
    if (options?.slug) return devSampleCourses.filter((c) => c.slug === options.slug);
    return devSampleCourses;
  }

  let domain: any[] = [['website_published', '=', true]];
  
  // Si se proporciona un slug, extraer el ID y buscarlo
  if (options?.slug) {
    const idMatch = options.slug.match(/-(\d+)$/);
    if (idMatch) {
      const id = parseInt(idMatch[1]);
      domain.push(['id', '=', id]);
    } else {
      // Si no hay ID en el slug, buscar por nombre aproximado
      domain.push(['name', 'ilike', options.slug.replace(/-/g, ' ')]);
    }
  }
  
  const fields = ['id', 'name', 'short_description', 'price', 'product_id', 'website_published'];
  const channels = await odooExecuteKw('slide.channel', 'search_read', [domain], {fields, limit: 24});
  
  return (channels || []).map((c: any) => ({
    id: c.id,
    title: c.name,
    slug: createSlug(c.name, c.id),
    description: c.short_description || '',
    price: c.price || 0,
    product_id: c.product_id?.[0],
    published: c.website_published
  }));
}

export async function fetchUserCourses(userId: number) {
  if (!isOdooConfigured) return [];
  
  const domain = [['partner_ids', 'in', [userId]]];
  const fields = ['id', 'name', 'completion', 'slides_count'];
  
  const enrollments = await odooExecuteKw('slide.channel.partner', 'search_read', [domain], {fields});
  return enrollments || [];
}

export async function fetchCourseContent(courseId: number, userId?: number) {
  if (!isOdooConfigured) return null;
  
  // Check if user has access
  if (userId) {
    const access = await odooExecuteKw('slide.channel.partner', 'search_count', [
      [['channel_id', '=', courseId], ['partner_id', '=', userId]]
    ]);
    if (!access) throw new Error('Access denied to this course');
  }
  
  const fields = ['id', 'name', 'slug', 'sequence', 'slide_type', 'duration', 'preview'];
  const slides = await odooExecuteKw('slide.slide', 'search_read', [
    [['channel_id', '=', courseId]]
  ], {fields, order: 'sequence ASC'});
  
  return slides || [];
}

export async function createSaleOrder(userId: number, productId: number) {
  if (!isOdooConfigured) throw new Error('Odoo not configured');
  
  // Create sale order
  const orderId = await odooExecuteKw('sale.order', 'create', [{
    partner_id: userId,
    state: 'draft'
  }]);
  
  // Add product line
  await odooExecuteKw('sale.order.line', 'create', [{
    order_id: orderId,
    product_id: productId,
    product_uom_qty: 1
  }]);
  
  return orderId;
}

export async function getUserProfile(userId: number) {
  if (!isOdooConfigured) return null;
  
  const fields = ['id', 'name', 'email', 'image_1920'];
  const partners = await odooExecuteKw('res.partner', 'search_read', [
    [['id', '=', userId]]
  ], {fields});
  
  return partners?.[0] || null;
} 