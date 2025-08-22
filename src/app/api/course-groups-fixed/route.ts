import { NextResponse } from 'next/server';
import { odooExecuteKw } from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Obtener todos los grupos ordenados por secuencia
    const groups = await odooExecuteKw('slide.channel.tag.group', 'search_read', 
      [[]], 
      {
        fields: ['id', 'name', 'sequence'],
        order: 'sequence ASC',
        limit: 20
      }
    );
    
    // 2. Obtener todas las etiquetas de una vez
    const allTags = await odooExecuteKw('slide.channel.tag', 'search_read',
      [[]],
      {
        fields: ['id', 'name', 'sequence', 'group_id', 'color'],
        order: 'sequence ASC, name ASC',
        limit: 200
      }
    );
    
    // 3. Estructurar los datos de forma segura
    const courseGroups = (groups || []).map((group: any) => {
      // Filtrar etiquetas que pertenecen a este grupo
      const groupTags = (allTags || []).filter((tag: any) => {
        try {
          // group_id puede ser [id, name] o null/false
          if (Array.isArray(tag.group_id) && tag.group_id.length >= 1) {
            return tag.group_id[0] === group.id;
          }
          return false;
        } catch {
          return false;
        }
      });
      
      return {
        id: group.id,
        name: group.name,
        sequence: group.sequence || 0,
        is_published: true,
        tags: groupTags.map((tag: any) => ({
          id: tag.id,
          name: tag.name || '',
          sequence: tag.sequence || 0,
          color: tag.color || 1
        }))
      };
    });
    
    // 4. Filtrar solo grupos que tienen etiquetas y nombres válidos
    const validGroups = courseGroups.filter((group: any) => 
      group.name && group.name.trim() !== '' && group.tags.length > 0
    );
    
    const stats = {
      totalGroups: validGroups.length,
      totalTags: validGroups.reduce((sum: number, group: any) => sum + group.tags.length, 0),
      groupsWithTags: validGroups.length
    };
    
    return NextResponse.json({
      status: 'success',
      message: 'Grupos de cursos obtenidos desde Odoo',
      data: {
        courseGroups: validGroups,
        stats
      }
    });
    
  } catch (error: any) {
    console.error('❌ Error obteniendo datos de Odoo:', error);
    
    // Fallback a datos mock si Odoo falla
    
    const mockGroups = [
      {
        id: 2,
        name: "Nivel",
        sequence: 10,
        is_published: true,
        tags: [
          { id: 1, name: "Básico", sequence: 10, color: 10 },
          { id: 2, name: "Intermedio", sequence: 20, color: 5 },
          { id: 3, name: "Avanzado", sequence: 30, color: 1 }
        ]
      },
      {
        id: 211,
        name: "Tecnologías", 
        sequence: 20,
        is_published: true,
        tags: [
          { id: 109, name: "AI Agents", sequence: 10, color: 2 },
          { id: 110, name: "MCP", sequence: 20, color: 3 },
          { id: 111, name: "n8n", sequence: 30, color: 4 },
          { id: 112, name: "LLMs", sequence: 40, color: 5 },
          { id: 113, name: "Docker", sequence: 50, color: 6 },
          { id: 114, name: "Kubernetes", sequence: 60, color: 7 }
        ]
      }
    ];
    
    return NextResponse.json({
      status: 'fallback',
      message: 'Usando datos mock debido a error en Odoo: ' + error.message,
      data: {
        courseGroups: mockGroups,
        stats: {
          totalGroups: mockGroups.length,
          totalTags: mockGroups.reduce((sum, group) => sum + group.tags.length, 0),
          groupsWithTags: mockGroups.length
        }
      }
    });
  }
}
