/**
 * Tests for the getAllProvinces service
 * @module tests/getAllProvinces
 */

const { testConnection } = require('../config/db');
const { getAllProvinces } = require('../data-service/getAllProvinces');

/**
 * Run tests for the getAllProvinces service
 */
async function testGetAllProvinces() {
  console.log('===== Testing getAllProvinces Service =====');

  try {
    // Verify database connection first
    console.log('\n📋 Testing database connection...');
    const connected = await testConnection();
    
    if (!connected) {
      console.error('❌ Failed to connect to database');
      return false;
    }
    console.log('✅ Successfully connected to database');

    // Test getting all provinces
    console.log('\n📋 Testing getAllProvinces()...');
    const allProvinces = await getAllProvinces();
    
    if (allProvinces && allProvinces.length > 0) {
      console.log(`✅ Successfully retrieved ${allProvinces.length} provinces`);
      console.log('   Sample provinces:');
      // Show up to 3 provinces as examples
      allProvinces.slice(0, 3).forEach(province => {
        console.log(`   - ${province.name} (ID: ${province.id})`);
      });
      
      console.log('\n✅ getAllProvinces test passed!');
      return true;
    } else {
      console.log('⚠️ No provinces found in database');
      return false;
    }
  } catch (error) {
    console.error('\n❌ getAllProvinces test failed:', error.message);
    console.error(error);
    return false;
  }
}

module.exports = { testGetAllProvinces };