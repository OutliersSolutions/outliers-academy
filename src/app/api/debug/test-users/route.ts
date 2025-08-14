import {NextResponse} from 'next/server';
import {odooExecuteKw} from '@/lib/odooClient';

export async function GET() {
  try {
    // Buscar usuarios que sean de test (creados recientemente con email test-)
    const users = await odooExecuteKw('res.users', 'search_read', [
      [['login', 'ilike', 'test-']], // Filtrar usuarios de test
      ['id', 'name', 'login', 'active', 'create_date', 'partner_id', 'groups_id']
    ]);

    // Obtener información de grupos para cada usuario
    const usersWithGroups = await Promise.all(
      users.map(async (user: any) => {
        try {
          const groups = await odooExecuteKw('res.groups', 'read', [
            user.groups_id || [],
            ['name', 'category_id']
          ]);
          
          return {
            ...user,
            groups: groups || []
          };
        } catch (error) {
          return {
            ...user,
            groups: []
          };
        }
      })
    );

    return NextResponse.json({
      users: usersWithGroups,
      total: usersWithGroups.length
    });

  } catch (error: any) {
    console.error('Error fetching test users:', error);
    return NextResponse.json({
      error: error.message || 'Error fetching users',
      users: [],
      total: 0
    }, {status: 500});
  }
}
