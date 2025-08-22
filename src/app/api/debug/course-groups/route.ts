import { NextResponse } from 'next/server';
import { odooExecuteKw } from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Debug: Obteniendo grupos de cursos y etiquetas de Odoo
    
    // 1. Obtener todos los grupos publicados, ordenados por secuencia
    const groups = await odooExecuteKw('slide.channel.tag.group', 'search_read', 
      [['website_published', '=', true]], 
      {
        fields: ['id', 'name', 'sequence', 'tag_ids'],
        order: 'sequence ASC'
      }
    );
    
    console.log(`✅ Encontrados ${groups?.length || 0} grupos publicados`);
    console.log('🔍 Datos de grupos:', JSON.stringify(groups, null, 2));
    
    // 2. Obtener todas las etiquetas para los grupos encontrados
    const allTagIds = groups?.flatMap((group: any) => group.tag_ids || []) || [];
    console.log('🔍 IDs de etiquetas a buscar:', allTagIds);
    
    if (allTagIds.length === 0) {
      return NextResponse.json({
        status: 'success',
        message: 'No hay etiquetas para mostrar',
        data: { courseGroups: [], stats: { totalGroups: groups?.length || 0, totalTags: 0, groupsWithTags: 0 } }
      });
    }
    
    const tags = await odooExecuteKw('slide.channel.tag', 'search_read',
      [['id', 'in', allTagIds]],
      {
        fields: ['id', 'name', 'sequence', 'group_id', 'color'],
        order: 'sequence ASC, name ASC'
      }
    );
    
    console.log(`✅ Encontradas ${tags?.length || 0} etiquetas`);
    console.log('� Datos de etiquetas:', JSON.stringify(tags, null, 2));
    
    return NextResponse.json({
      status: 'debug',
      message: 'Datos raw obtenidos',
      data: {
        groups: groups,
        tags: tags,
        allTagIds: allTagIds
      }
    });
    
  } catch (error: any) {
    console.error('❌ Error obteniendo grupos de cursos:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message,
      error: error.toString()
    }, { status: 500 });
  }
}
