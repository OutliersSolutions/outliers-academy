/**
 * Script para verificar permisos de usuario en Odoo
 * Ejecutar con: node scripts/verify-user-permissions.cjs
 */

const fetch = require('node-fetch');

// Configuración
const APP_URL = 'http://localhost:3000';

async function verifyUserPermissions() {
  console.log('🔍 Verificando permisos de usuarios creados en Odoo...\n');
  
  try {
    // Obtener conexión con Odoo
    const connectionResponse = await fetch(`${APP_URL}/api/debug/odoo-connection`);
    const connectionData = await connectionResponse.json();
    
    if (!connectionResponse.ok) {
      throw new Error('No se pudo conectar con Odoo');
    }
    
    console.log('✅ Conectado a Odoo como:', connectionData.user);
    console.log(`📊 Database: ${connectionData.database}\n`);

    // Buscar usuarios de test creados recientemente
    const testUsersResponse = await fetch(`${APP_URL}/api/debug/test-users`);
    
    if (testUsersResponse.ok) {
      const testUsers = await testUsersResponse.json();
      
      if (testUsers.users && testUsers.users.length > 0) {
        console.log(`👥 Usuarios de test encontrados: ${testUsers.users.length}\n`);
        
        testUsers.users.forEach((user, index) => {
          console.log(`${index + 1}. ${user.name} (${user.login})`);
          console.log(`   ID: ${user.id}`);
          console.log(`   Estado: ${user.active ? 'Activo' : 'Inactivo'}`);
          console.log(`   Grupos: ${user.groups?.map(g => g.name).join(', ') || 'Sin grupos específicos'}`);
          console.log(`   Creado: ${user.create_date}`);
          console.log('');
        });
      } else {
        console.log('📝 No se encontraron usuarios de test recientes\n');
      }
    }

    // Verificar grupos disponibles
    const groupsResponse = await fetch(`${APP_URL}/api/debug/odoo-groups`);
    
    if (groupsResponse.ok) {
      const groupsData = await groupsResponse.json();
      
      console.log('🏷️ Grupos de permisos disponibles:');
      console.log('═'.repeat(50));
      
      groupsData.groups?.forEach(group => {
        const isPortal = group.name.toLowerCase().includes('portal');
        const isPublic = group.name.toLowerCase().includes('public');
        const isUser = group.name.toLowerCase().includes('user');
        
        const icon = isPortal ? '🔒' : isPublic ? '🌐' : isUser ? '👤' : '⚙️';
        
        console.log(`${icon} ${group.name}`);
        console.log(`   Categoría: ${group.category || 'Base'}`);
        console.log(`   ID: ${group.id}\n`);
      });
    }

    console.log('🎯 Recomendaciones de seguridad:');
    console.log('═'.repeat(50));
    console.log('✅ Los usuarios nuevos deben tener solo acceso Portal');
    console.log('✅ Evitar dar permisos de administrador');
    console.log('✅ Usar grupos específicos para controlar acceso');
    console.log('✅ Validar permisos antes de mostrar contenido');
    
  } catch (error) {
    console.error('❌ Error verificando permisos:', error.message);
  }
}

verifyUserPermissions();
