/**
 * Tests for the getProvincesWithEthnicGroups service
 * @module tests/getProvincesWithEthnicGroups
 */

const { testConnection } = require('../config/db');
const { getProvincesWithEthnicGroups } = require('../data-service/getProvincesWithEthnicGroups');

/**
 * Run tests for the getProvincesWithEthnicGroups service
 */
async function testGetProvincesWithEthnicGroups() {
  console.log('===== Testing getProvincesWithEthnicGroups Service =====');

  try {
    // Verify database connection first
    console.log('\n📋 Testing database connection...');
    const connected = await testConnection();
    
    if (!connected) {
      console.error('❌ Failed to connect to database');
      return false;
    }
    console.log('✅ Successfully connected to database');

    // Test getting provinces with ethnic groups
    console.log('\n📋 Testing getProvincesWithEthnicGroups()...');
    const provincesWithEthnicGroups = await getProvincesWithEthnicGroups();
    
    if (provincesWithEthnicGroups && provincesWithEthnicGroups.length > 0) {
      console.log(`✅ Successfully retrieved ${provincesWithEthnicGroups.length} provinces with ethnic groups`);
      console.log('   Sample province with ethnic groups:');
      const sample = provincesWithEthnicGroups[0];
      console.log(`   - ${sample.name} has ${sample.ethnicGroups.length} ethnic groups`);
      
      if (sample.ethnicGroups.length > 0) {
        console.log(`     First ethnic group: ${sample.ethnicGroups[0].name} (ID: ${sample.ethnicGroups[0].id})`);
      }
      
      console.log('\n✅ getProvincesWithEthnicGroups test passed!');
      return true;
    } else {
      console.log('⚠️ No provinces with ethnic groups found in database');
      return false;
    }
  } catch (error) {
    console.error('\n❌ getProvincesWithEthnicGroups test failed:', error.message);
    console.error(error);
    return false;
  }
}

module.exports = { testGetProvincesWithEthnicGroups };