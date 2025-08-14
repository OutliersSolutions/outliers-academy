import {NextResponse} from 'next/server';
import {odooExecuteKw} from '@/lib/odooClient';

export async function POST() {
  try {
    console.log('🧹 Iniciando limpieza de usuarios de test...');
    
    // Buscar usuarios de test
    const testUsers = await odooExecuteKw('res.users', 'search_read', [
      [['login', 'ilike', 'test-']], // Solo usuarios con login que contenga 'test-'
      ['id', 'name', 'login', 'partner_id']
    ]);

    let deleted = 0;
    let errors = 0;
    const deletedUsers = [];

    for (const user of testUsers) {
      try {
        console.log(`Eliminando usuario: ${user.name} (${user.login})`);
        
        // Primero eliminar el usuario
        await odooExecuteKw('res.users', 'unlink', [[user.id]]);
        
        // Luego eliminar el partner asociado si existe
        if (user.partner_id) {
          const partnerId = Array.isArray(user.partner_id) ? user.partner_id[0] : user.partner_id;
          try {
            await odooExecuteKw('res.partner', 'unlink', [[partnerId]]);
          } catch (partnerError: any) {
            console.warn(`No se pudo eliminar partner ${partnerId}:`, partnerError.message);
          }
        }
        
        deleted++;
        deletedUsers.push({
          name: user.name,
          login: user.login,
          id: user.id
        });
        
      } catch (deleteError: any) {
        console.error(`Error eliminando usuario ${user.id}:`, deleteError.message);
        errors++;
      }
    }

    console.log(`✅ Limpieza completada: ${deleted} eliminados, ${errors} errores`);

    return NextResponse.json({
      success: true,
      found: testUsers.length,
      deleted,
      errors,
      deletedUsers
    });

  } catch (error: any) {
    console.error('Error en limpieza:', error);
    return NextResponse.json({
      error: error.message || 'Error en limpieza',
      success: false,
      found: 0,
      deleted: 0,
      errors: 1
    }, {status: 500});
  }
}
