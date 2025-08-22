import { NextResponse } from 'next/server';
import { odooExecuteKw } from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🔍 Debuggando etiquetas de Odoo...');
    
    // Obtener solo algunas etiquetas para debug
    const tags = await odooExecuteKw('slide.channel.tag', 'search_read', 
      [[]], 
      {
        fields: ['id', 'name', 'group_id'],
        limit: 5
      }
    );
    
    console.log(`✅ Encontradas ${tags?.length || 0} etiquetas`);
    console.log('🔍 Datos de etiquetas:', JSON.stringify(tags, null, 2));
    
    return NextResponse.json({
      status: 'debug',
      message: 'Etiquetas obtenidas',
      data: {
        tags: tags
      }
    });
    
  } catch (error: any) {
    console.error('❌ Error obteniendo etiquetas:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message,
      error: error.toString()
    }, { status: 500 });
  }
}
