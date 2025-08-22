import { NextResponse } from 'next/server';
import { odooExecuteKw } from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Crear API final para obtener grupos de cursos desde Odoo
    
    // 1. Obtener todos los grupos (sin filtro)
    const groups = await odooExecuteKw('slide.channel.tag.group', 'search_read', 
      [[]], // Sin filtros
      {
        fields: ['id', 'name', 'sequence'],
        order: 'sequence ASC'
      }
    );
    
    // 2. Para cada grupo, obtener sus etiquetas por separado
    const courseGroups = [];
    
    for (const group of groups || []) {
      const groupTags = await odooExecuteKw('slide.channel.tag', 'search_read',
        [['group_id', '=', group.id]],
        {
          fields: ['id', 'name', 'sequence', 'color'],
          order: 'sequence ASC, name ASC'
        }
      );
      
      courseGroups.push({
        id: group.id,
        name: group.name,
        sequence: group.sequence,
        is_published: true,
        tags: groupTags?.map((tag: any) => ({
          id: tag.id,
          name: tag.name,
          sequence: tag.sequence,
          color: tag.color
        })) || []
      });
    }
    
    const stats = {
      totalGroups: courseGroups.length,
      totalTags: courseGroups.reduce((sum, group) => sum + group.tags.length, 0),
      groupsWithTags: courseGroups.filter(g => g.tags.length > 0).length
    };
    
    return NextResponse.json({
      status: 'success',
      message: 'Grupos de cursos obtenidos exitosamente desde Odoo',
      data: {
        courseGroups,
        stats
      }
    });
    
  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message,
      error: error.toString()
    }, { status: 500 });
  }
}
