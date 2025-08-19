import {NextResponse} from 'next/server';
import {odooExecuteKw} from '@/lib/odooClient';
export async function GET() {
  try {
    // Obtener todos los grupos del sistema
    const groups = await odooExecuteKw('res.groups', 'search_read', [
      [], // Sin filtros, todos los grupos
      ['name', 'category_id', 'comment', 'full_name']
    ]);
    // Obtener categorías de grupos para contexto
    const categories = await odooExecuteKw('ir.module.category', 'search_read', [
      [],
      ['name', 'description']
    ]);
    // Mapear grupos con sus categorías
    const groupsWithCategories = groups.map((group: any) => {
      const categoryId = Array.isArray(group.category_id) ? group.category_id[0] : group.category_id;
      const category = categories.find((cat: any) => cat.id === categoryId);
      return {
        ...group,
        category: category?.name || 'Base',
        categoryDescription: category?.description || ''
      };
    });
    // Filtrar grupos más relevantes para mostrar
    const relevantGroups = groupsWithCategories.filter((group: any) => 
      group.name.toLowerCase().includes('portal') ||
      group.name.toLowerCase().includes('public') ||
      group.name.toLowerCase().includes('user') ||
      group.name.toLowerCase().includes('internal') ||
      group.name.toLowerCase().includes('admin') ||
      group.category === 'Administration' ||
      group.category === 'User types'
    );
    return NextResponse.json({
      groups: relevantGroups.sort((a: any, b: any) => a.name.localeCompare(b.name)),
      total: relevantGroups.length,
      allGroups: groups.length
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || 'Error fetching groups',
      groups: [],
      total: 0
    }, {status: 500});
  }
}
