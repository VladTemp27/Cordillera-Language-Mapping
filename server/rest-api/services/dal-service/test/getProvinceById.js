/**
 * Tests for the getProvinceById service
 * @module tests/getProvinceById
 */

const { testConnection } = require('../config/db');
const { getProvinceById } = require('../data-service/getProvinceById');
const { getAllProvinces } = require('../data-service/getAllProvinces');

/**
 * Run tests for the getProvinceById service
 */
async function testGetProvinceById() {
  console.log('===== Testing getProvinceById Service =====');

  try {
    // Verify database connection first
    console.log('\n📋 Testing database connection...');
    const connected = await testConnection();
    
    if (!connected) {
      console.error('❌ Failed to connect to database');
      return false;
    }
    console.log('✅ Successfully connected to database');

    // First get all provinces to find a valid ID to test with
    const allProvinces = await getAllProvinces();
    
    if (!allProvinces || allProvinces.length === 0) {
      console.log('⚠️ No provinces found in database to test with');
      return false;
    }

    // Test getting province by ID (using first province from results)
    const sampleProvinceId = allProvinces[0].id;
    
    console.log(`\n📋 Testing getProvinceById(${sampleProvinceId})...`);
    const provinceById = await getProvinceById(sampleProvinceId);
    
    let testPassed = true;
    
    if (provinceById) {
      console.log(`✅ Successfully retrieved province: ${provinceById.name}`);
      console.log('   Province details:');
      console.log(`   - ID: ${provinceById.id}`);
      console.log(`   - Name: ${provinceById.name}`);
      console.log(`   - History: ${provinceById.history ? 'Available' : 'Not available'}`);
    } else {
      console.log(`❌ Failed to retrieve province with ID ${sampleProvinceId}`);
      testPassed = false;
    }

    // Test invalid ID
    const invalidId = 9999;
    console.log(`\n📋 Testing getProvinceById with invalid ID (${invalidId})...`);
    const nonExistentProvince = await getProvinceById(invalidId);
    
    if (nonExistentProvince === null) {
      console.log('✅ Correctly returned null for non-existent province');
    } else {
      console.log('❌ Did not return null for non-existent province');
      testPassed = false;
    }

    if (testPassed) {
      console.log('\n✅ getProvinceById test passed!');
    } else {
      console.log('\n❌ getProvinceById test failed!');
    }
    
    return testPassed;
  } catch (error) {
    console.error('\n❌ getProvinceById test failed:', error.message);
    console.error(error);
    return false;
  }
}

module.exports = { testGetProvinceById };