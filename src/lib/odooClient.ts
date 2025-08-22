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
export async function authenticate(): Promise<number> {
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
export async function sendVerificationEmail(userId: number, userEmail: string): Promise<boolean> {
  try {
    // Generate a simple verification token (in production, use JWT or similar)
    const verificationToken = Buffer.from(`${userId}:${userEmail}:${Date.now()}`).toString('base64');
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/es/verify-account?token=${verificationToken}`;
    // Create email manually (we know this works)
    const emailData = {
      email_to: userEmail,
      subject: '🚀 Verifica tu cuenta de Outliers Academy',
      body_html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4F46E5; margin: 0;">🚀 Outliers Academy</h1>
            <h2 style="color: #374151; margin: 10px 0;">¡Bienvenido/a!</h2>
          </div>
          <div style="background: #F9FAFB; padding: 25px; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">
              Hola,<br><br>
              ¡Gracias por registrarte en Outliers Academy! Para completar tu registro y activar tu cuenta, necesitamos verificar tu dirección de correo electrónico.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: #4F46E5; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
                ✅ Verificar mi cuenta
              </a>
            </div>
            <p style="font-size: 14px; color: #6B7280; margin: 20px 0 0 0;">
              Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:<br>
              <span style="word-break: break-all; color: #4F46E5;">${verificationUrl}</span>
            </p>
          </div>
          <div style="margin: 30px 0;">
            <h3 style="color: #374151; font-size: 18px;">¿Qué sigue?</h3>
            <ul style="color: #6B7280; line-height: 1.6;">
              <li>✨ Accede a cursos de tecnología de alta calidad</li>
              <li>🎯 Aprende con proyectos prácticos</li>
              <li>🤖 Interactúa con nuestro asistente de IA</li>
              <li>🏆 Obtén certificaciones reconocidas</li>
            </ul>
          </div>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          <div style="text-align: center;">
            <p style="color: #6B7280; font-size: 14px; margin: 0;">
              Si no creaste esta cuenta, puedes ignorar este email.<br>
              <strong>Equipo de Outliers Academy</strong>
            </p>
            <p style="color: #9CA3AF; font-size: 12px; margin: 10px 0 0 0;">
              Este enlace expira en 24 horas por seguridad.
            </p>
          </div>
        </div>
      `,
      email_from: process.env.EMAIL_FROM || 'noreply@outliers.academy',
      auto_delete: false,
      state: 'outgoing'
    };
    // Create and send the email
    const mailId = await odooExecuteKw('mail.mail', 'create', [emailData]);
    // Force send immediately
    await odooExecuteKw('mail.mail', 'send', [[mailId]]);
    return true;
  } catch (error: any) {
    return false;
  }
}

// Helper function to create slug from name and id
function createSlug(name: string, id: number): string {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${id}`;
}

export async function fetchCourses(options?: {slug?: string, limit?: number, sortBy?: string}) {
  if (!isOdooConfigured) {
    throw new Error('🤦‍♂️ ¡Ups! No configuraste Odoo, cuy. Configura las variables de entorno: ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD');
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
  
  // Incluir más campos relevantes de Odoo para datos reales
  const fields = [
    'id', 'name', 'description', 'product_id', 'website_published',
    'members_count', 'rating_avg', 'total_slides', 'total_time', 'total_views',
    'channel_type', 'image_1920'
  ];
  
  // Configurar ordenamiento - por defecto por número de miembros (más populares)
  let order = 'members_count DESC';
  if (options?.sortBy === 'rating') {
    order = 'rating_avg DESC';
  } else if (options?.sortBy === 'views') {
    order = 'total_views DESC';
  } else if (options?.sortBy === 'popularity') {
    order = 'members_count DESC';
  }
  
  // Limitar a 6 cursos para la sección "Top courses" si no se especifica otra cosa
  const limit = options?.limit || (options?.slug ? 1 : 6);
  
  const channels = await odooExecuteKw('slide.channel', 'search_read', [domain], {
    fields, 
    limit, 
    order
  });
  
  // Get all unique product IDs
  const productIds = [...new Set(
    (channels || [])
      .map((c: any) => c.product_id && Array.isArray(c.product_id) ? c.product_id[0] : null)
      .filter(Boolean)
  )];
  // Fetch all product prices in one call if there are any products
  const productPrices: Record<number, number> = {};
  if (productIds.length > 0) {
    try {
      const products = await odooExecuteKw('product.product', 'search_read', 
        [[['id', 'in', productIds]]], 
        {fields: ['id', 'list_price']}
      );
      for (const product of products || []) {
        productPrices[product.id] = product.list_price || 0;
      }
    } catch (error) {
    }
  }
  // Map channels with their real data from Odoo
  return (channels || []).map((c: any) => ({
    id: c.id,
    title: c.name,
    slug: createSlug(c.name, c.id),
    description: c.description || '',
    price: c.product_id?.[0] ? (productPrices[c.product_id[0]] || 0) : 0,
    product_id: c.product_id?.[0],
    published: c.website_published,
    // Datos reales de Odoo sin mock
    students: c.members_count || 0,
    rating: c.rating_avg || 0,
    duration: c.total_time || 0,
    lessons_count: c.total_slides || 0,
    views: c.total_views || 0,
    // Generate proper Odoo image URL using environment variable
    image: c.image_1920 ? `${ODOO_URL}/web/image/slide.channel/${c.id}/image_1920` : null
  }));
}
export async function fetchUserCourses(userId: number) {
  if (!isOdooConfigured) {
    throw new Error('🤦‍♂️ ¡Ups! No configuraste Odoo, cuy. Los cursos necesitan conexión real con Odoo.');
  }
  
  // First get user enrollments
  const enrollmentDomain = [['partner_ids', 'in', [userId]]];
  const enrollmentFields = ['id', 'channel_id', 'completion'];
  const enrollments = await odooExecuteKw('slide.channel.partner', 'search_read', [enrollmentDomain], {fields: enrollmentFields});
  
  if (!enrollments || enrollments.length === 0) return [];
  
  // Get channel IDs from enrollments
  const channelIds = enrollments.map((e: any) => Array.isArray(e.channel_id) ? e.channel_id[0] : e.channel_id);
  
  // Get only published courses that user is enrolled in
  const courseDomain = [['id', 'in', channelIds], ['website_published', '=', true]];
  const courseFields = ['id', 'name', 'slides_count', 'total_time'];
  const courses = await odooExecuteKw('slide.channel', 'search_read', [courseDomain], {fields: courseFields});
  
  // Merge enrollment data with course data
  return courses?.map((course: any) => {
    const enrollment = enrollments.find((e: any) => {
      const channelId = Array.isArray(e.channel_id) ? e.channel_id[0] : e.channel_id;
      return channelId === course.id;
    });
    return {
      ...course,
      completion: enrollment?.completion || 0
    };
  }) || [];
}
export async function checkCourseAccess(courseId: number, userId: number): Promise<boolean> {
  if (!isOdooConfigured) {
    // In development, allow access to any course
    return true;
  }
  
  try {
    // Check if user is enrolled in the course
    const enrollment = await odooExecuteKw('slide.channel.partner', 'search_count', [
      [['channel_id', '=', courseId], ['partner_id', '=', userId]]
    ]);
    
    if (enrollment > 0) {
      return true;
    }

    // Check if user has purchased the course (check sale orders)
    const orders = await odooExecuteKw('sale.order', 'search_read', [
      [
        ['partner_id', '=', userId],
        ['state', 'in', ['sale', 'done']] // Confirmed or completed orders
      ]
    ], {fields: ['id', 'order_line']});

    for (const order of orders || []) {
      if (order.order_line && Array.isArray(order.order_line)) {
        // Get order lines to check if this course's product is included
        const lines = await odooExecuteKw('sale.order.line', 'search_read', [
          [['id', 'in', order.order_line]]
        ], {fields: ['product_id']});

        // Get the course's product_id (only if published)
        const course = await odooExecuteKw('slide.channel', 'search_read', [
          [['id', '=', courseId], ['website_published', '=', true]]
        ], {fields: ['product_id']});

        if (course?.[0]?.product_id) {
          const courseProductId = Array.isArray(course[0].product_id) 
            ? course[0].product_id[0] 
            : course[0].product_id;

          // Check if any order line contains this course's product
          const hasCourseProduct = lines?.some((line: any) => {
            const lineProductId = Array.isArray(line.product_id) 
              ? line.product_id[0] 
              : line.product_id;
            return lineProductId === courseProductId;
          });

          if (hasCourseProduct) {
            // Automatically enroll user in the course if they purchased it
            try {
              await odooExecuteKw('slide.channel.partner', 'create', [{
                channel_id: courseId,
                partner_id: userId
              }]);
            } catch (enrollError) {
              // Enrollment might already exist, ignore error
            }
            return true;
          }
        }
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking course access:', error);
    return false;
  }
}

export async function fetchCourseContent(courseId: number, userId?: number) {
  if (!isOdooConfigured) {
    throw new Error('🤦‍♂️ ¡Ups! No configuraste Odoo, cuy. El contenido del curso necesita conexión real.');
  }
  
  // Check if user has access
  if (userId) {
    const hasAccess = await checkCourseAccess(courseId, userId);
    if (!hasAccess) {
      throw new Error('Access denied to this course');
    }
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
  if (!isOdooConfigured) {
    throw new Error('🤦‍♂️ ¡Ups! No configuraste Odoo, cuy. Los perfiles necesitan conexión real con Odoo.');
  }
  
  const fields = ['id', 'name', 'email', 'image_1920', 'phone', 'mobile', 'website', 'title', 'function', 'street', 'city', 'country_id', 'create_date', 'timezone'];
  const partners = await odooExecuteKw('res.partner', 'search_read', [
    [['id', '=', userId]]
  ], {fields});
  return partners?.[0] || null;
}

export async function updateUserProfile(userId: number, data: {name?: string; email?: string; phone?: string; mobile?: string; website?: string; title?: string; function?: string; street?: string; city?: string}) {
  if (!isOdooConfigured) {
    throw new Error('🤦‍♂️ ¡Ups! No configuraste Odoo, cuy. Actualizar perfiles necesita conexión real.');
  }
  
  try {
    await odooExecuteKw('res.partner', 'write', [[userId], data]);
    
    const updatedProfile = await getUserProfile(userId);
    
    return updatedProfile;
  } catch (error: any) {
    throw error;
  }
}

export async function updateUserAvatar(userId: number, avatarBase64: string) {
  if (!isOdooConfigured) throw new Error('Odoo not configured');
  
  await odooExecuteKw('res.partner', 'write', [[userId], {
    image_1920: avatarBase64
  }]);
  return getUserProfile(userId);
}
export async function getAcademyStats() {
  if (!isOdooConfigured) {
    throw new Error('🤦‍♂️ ¡Ups! No configuraste Odoo, cuy. Las estadísticas necesitan datos reales de Odoo.');
  }
  try {
    // Count total students enrolled in courses (using slide.channel.partner for enrollments)
    const totalStudents = await odooExecuteKw('slide.channel.partner', 'search_count', [[]]);
    // Count total published courses
    const totalCourses = await odooExecuteKw('slide.channel', 'search_count', [
      [['website_published', '=', true]]
    ]);
    // Get average rating and review count from course ratings (if available)
    let averageRating = 4.8;
    let totalReviews = 0;
    try {
      // Try to get ratings from website.rating model or slide.channel ratings
      const ratings = await odooExecuteKw('rating.rating', 'search_read', [
        [['res_model', '=', 'slide.channel'], ['rating', '>', 0]]
      ], {fields: ['rating']});
      if (ratings && ratings.length > 0) {
        const sum = ratings.reduce((acc: number, r: any) => acc + r.rating, 0);
        averageRating = Math.round((sum / ratings.length) * 10) / 10;
        totalReviews = ratings.length;
      }
    } catch (ratingError) {
      // Keep default values
    }
    return {
      totalStudents: totalStudents || 0,
      averageRating,
      totalReviews,
      totalCourses: totalCourses || 0
    };
  } catch (error) {
    // Return fallback data
    return {
      totalStudents: 10000,
      averageRating: 4.8,
      totalReviews: 2340,
      totalCourses: 50
    };
  }
}

// Get company contact information from Odoo
export async function getCompanyInfo() {
  if (!isOdooConfigured) {
    // Return fallback data when Odoo is not configured
    return {
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@outliersacademy.com',
      phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+51999999999',
      whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51999999999',
      calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/outliersacademy'
    };
  }

  try {
    // Get the main company record
    const companies = await odooExecuteKw('res.company', 'search_read', [[]], {
      fields: ['name', 'email', 'phone', 'mobile', 'website'],
      limit: 1
    });

    if (companies && companies.length > 0) {
      const company = companies[0];
      return {
        email: company.email || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@outliersacademy.com',
        phone: company.phone || company.mobile || process.env.NEXT_PUBLIC_CONTACT_PHONE || '+51999999999',
        whatsapp: company.mobile || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51999999999',
        calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/outliersacademy'
      };
    }
  } catch (error) {
    console.log('Error fetching company info from Odoo:', error);
  }

  // Fallback to environment variables
  return {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@outliersacademy.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+51999999999',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51999999999',
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/outliersacademy'
  };
}
