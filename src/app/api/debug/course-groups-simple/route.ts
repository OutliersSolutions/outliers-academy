import { NextResponse } from 'next/server';
import { odooExecuteKw } from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🔍 Obteniendo grupos de cursos y etiquetas de Odoo...');
    
    // 1. Obtener grupos publicados
    const groups = await odooExecuteKw('slide.channel.tag.group', 'search_read', 
      [['website_published', '=', true]], 
      {
        fields: ['id', 'name', 'sequence', 'tag_ids', 'website_published'],
        order: 'sequence ASC'
      }
    );
    
    console.log(`✅ Encontrados ${groups?.length || 0} grupos publicados`);
    
    // 2. Obtener todas las etiquetas
    const tags = await odooExecuteKw('slide.channel.tag', 'search_read', 
      [[]], 
      {
        fields: ['id', 'name', 'sequence', 'group_id', 'color'],
        order: 'sequence ASC, name ASC'
      }
    );
    
    console.log(`✅ Encontradas ${tags?.length || 0} etiquetas`);
    
    // 3. Estructurar los datos (sin filtrar por ahora para evitar el error)
    const courseGroups = groups?.map((group: any) => ({
      id: group.id,
      name: group.name,
      sequence: group.sequence,
      is_published: group.website_published,
      tags: [] // Por ahora vacío para evitar el error
    })) || [];
    
    const stats = {
      totalGroups: groups?.length || 0,
      totalTags: tags?.length || 0,
      groupsWithTags: 0
    };
    
    return NextResponse.json({
      status: 'success',
      message: 'Grupos de cursos obtenidos exitosamente',
      data: {
        courseGroups,
        stats
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
