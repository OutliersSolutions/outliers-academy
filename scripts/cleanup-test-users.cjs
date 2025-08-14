/**
 * Script para limpiar usuarios de test y corregir permisos
 * Ejecutar con: node scripts/cleanup-test-users.cjs
 */

const fetch = require('node-fetch');

// Configuración
const APP_URL = 'http://localhost:3000';

async function cleanupTestUsers() {
  console.log('🧹 Limpiando usuarios de test con permisos incorrectos...\n');
  
  try {
    // Crear API para limpiar usuarios de test
    const cleanupResponse = await fetch(`${APP_URL}/api/debug/cleanup-test-users`, {
      method: 'POST'
    });
    
    const cleanupData = await cleanupResponse.json();
    
    if (cleanupResponse.ok) {
      console.log('✅ Limpieza completada:');
      console.log(`   Usuarios encontrados: ${cleanupData.found}`);
      console.log(`   Usuarios eliminados: ${cleanupData.deleted}`);
      console.log(`   Errores: ${cleanupData.errors}\n`);
      
      if (cleanupData.deletedUsers && cleanupData.deletedUsers.length > 0) {
        console.log('🗑️ Usuarios eliminados:');
        cleanupData.deletedUsers.forEach(user => {
          console.log(`   - ${user.name} (${user.login})`);
        });
        console.log('');
      }
    } else {
      console.log('❌ Error en limpieza:', cleanupData.error);
    }
    
  } catch (error) {
    console.error('❌ Error ejecutando limpieza:', error.message);
  }
}

async function testNewSignupFlow() {
  console.log('🆕 Probando nuevo flujo de registro con permisos corregidos...\n');
  
  const TEST_USER = {
    name: 'Usuario Test Seguro',
    email: `secure-test-${Date.now()}@outliersacademy.com`,
    password: 'password123'
  };
  
  try {
    // Crear nueva cuenta
    console.log('📝 Creando cuenta con permisos limitados...');
    const signupResponse = await fetch(`${APP_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TEST_USER)
    });
    
    const signupData = await signupResponse.json();
    
    if (!signupResponse.ok) {
      throw new Error(`Error en signup: ${signupData.error}`);
    }
    
    console.log('✅ Cuenta creada exitosamente');
    console.log(`   User ID: ${signupData.user?.uid}`);
    console.log(`   Email: ${signupData.user?.login}\n`);
    
    // Verificar permisos del nuevo usuario
    console.log('🔍 Verificando permisos del nuevo usuario...');
    
    const testUsersResponse = await fetch(`${APP_URL}/api/debug/test-users`);
    const testUsersData = await testUsersResponse.json();
    
    if (testUsersResponse.ok && testUsersData.users) {
      const newUser = testUsersData.users.find(u => u.login === TEST_USER.email);
      
      if (newUser) {
        console.log('👤 Usuario encontrado:');
        console.log(`   Nombre: ${newUser.name}`);
        console.log(`   Estado: ${newUser.active ? 'Activo' : 'Inactivo'}`);
        console.log(`   Grupos: ${newUser.groups?.map(g => g.name).join(', ') || 'Sin grupos'}`);
        
        // Verificar que solo tenga acceso Portal
        const hasOnlyPortal = newUser.groups?.length === 1 && 
                             newUser.groups[0]?.name === 'Portal';
        
        if (hasOnlyPortal) {
          console.log('✅ ¡PERFECTO! Usuario tiene solo permisos Portal');
        } else if (newUser.groups?.length === 0) {
          console.log('⚠️ Usuario sin grupos (puede ser seguro)');
        } else {
          console.log('❌ PROBLEMA: Usuario tiene permisos adicionales');
          newUser.groups?.forEach(group => {
            console.log(`   - ${group.name} (peligroso si no es Portal)`);
          });
        }
      }
    }
    
    console.log('\n🎯 Test de seguridad completado');
    
  } catch (error) {
    console.error('❌ Error en test de signup:', error.message);
  }
}

async function runCleanupAndTest() {
  console.log('🔧 Outliers Academy - Limpieza y Test de Seguridad\n');
  console.log('═'.repeat(60));
  
  // Limpiar usuarios anteriores
  await cleanupTestUsers();
  
  // Probar nuevo flujo
  await testNewSignupFlow();
  
  console.log('═'.repeat(60));
  console.log('✅ Proceso completado');
}

runCleanupAndTest();
