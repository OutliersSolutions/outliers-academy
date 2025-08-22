import { NextResponse } from 'next/server';
import { odooExecuteKw } from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // API simplificada con datos mock basados en Odoo
    
    // Usar los datos que ya sabemos que funcionan del primer debug
    const courseGroups = [
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
      },
      {
        id: 212,
        name: "Casos de uso",
        sequence: 30,
        is_published: true,
        tags: [
          { id: 124, name: "Chatbot", sequence: 10, color: 8 },
          { id: 125, name: "Automatización", sequence: 20, color: 9 },
          { id: 126, name: "Integraciones", sequence: 30, color: 10 }
        ]
      },
      {
        id: 213,
        name: "Plataformas",
        sequence: 40,
        is_published: true,
        tags: [
          { id: 127, name: "OpenAI", sequence: 10, color: 1 },
          { id: 128, name: "Anthropic", sequence: 20, color: 2 },
          { id: 129, name: "Azure OpenAI", sequence: 30, color: 3 }
        ]
      }
    ];
    
    const stats = {
      totalGroups: courseGroups.length,
      totalTags: courseGroups.reduce((sum, group) => sum + group.tags.length, 0),
      groupsWithTags: courseGroups.filter(g => g.tags.length > 0).length
    };
    
    return NextResponse.json({
      status: 'success',
      message: 'Grupos de cursos obtenidos (mock data basado en estructura real de Odoo)',
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
