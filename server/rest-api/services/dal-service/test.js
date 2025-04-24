/**
 * Master test runner for all data services
 * @module test
 */

// Import individual test modules
const { testGetAllProvinces } = require('./test/getAllProvinces');
const { testGetProvinceById } = require('./test/getProvinceById');
const { testGetProvincesWithEthnicGroups } = require('./test/getProvincesWithEthnicGroups');
const { testGetProvincesWithLanguages } = require('./test/getProvincesWithLanguages');

/**
 * Run all tests for all data services
 */
async function runAllTests() {
  console.log('======================================');
  console.log('===== CORDILLERA MAPPING PROJECT =====');
  console.log('===== RUNNING ALL SERVICE TESTS  =====');
  console.log('======================================\n');

  try {
    // Track test results
    const testResults = {
      getAllProvinces: false,
      getProvinceById: false,
      getProvincesWithEthnicGroups: false,
      getProvincesWithLanguages: false
    };

    // Run all tests in sequence
    testResults.getAllProvinces = await testGetAllProvinces();
    console.log('\n--------------------------------------\n');
    
    testResults.getProvinceById = await testGetProvinceById();
    console.log('\n--------------------------------------\n');
    
    testResults.getProvincesWithEthnicGroups = await testGetProvincesWithEthnicGroups();
    console.log('\n--------------------------------------\n');
    
    testResults.getProvincesWithLanguages = await testGetProvincesWithLanguages();

    // Show summary
    console.log('\n======================================');
    console.log('========= TEST RESULT SUMMARY =========');
    console.log('=======================================');
    console.log(`getAllProvinces..................${testResults.getAllProvinces ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`getProvinceById.................${testResults.getProvinceById ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`getProvincesWithEthnicGroups....${testResults.getProvincesWithEthnicGroups ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`getProvincesWithLanguages.......${testResults.getProvincesWithLanguages ? '✅ PASSED' : '❌ FAILED'}`);
    console.log('=======================================');
    
    // Calculate overall result
    const allPassed = Object.values(testResults).every(result => result === true);
    console.log(`OVERALL TEST RESULT: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    console.log('=======================================');
    
    return allPassed;
  } catch (error) {
    console.error('\n❌ Test execution failed:', error.message);
    console.error(error);
    return false;
  }
}

// Run all tests if this file is executed directly
if (require.main === module) {
  runAllTests()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(err => {
      console.error('Test runner encountered an error:', err);
      process.exit(1);
    });
}

module.exports = { runAllTests };