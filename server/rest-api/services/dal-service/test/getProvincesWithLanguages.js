/**
 * Tests for the getProvincesWithLanguages service
 * @module tests/getProvincesWithLanguages
 */

const { testConnection } = require('../config/db');
const { getProvincesWithLanguages } = require('../data-service/getProvincesWithLanguages');

/**
 * Run tests for the getProvincesWithLanguages service
 */
async function testGetProvincesWithLanguages() {
  console.log('===== Testing getProvincesWithLanguages Service =====');

  try {
    // Verify database connection first
    console.log('\n📋 Testing database connection...');
    const connected = await testConnection();
    
    if (!connected) {
      console.error('❌ Failed to connect to database');
      return false;
    }
    console.log('✅ Successfully connected to database');

    // Test getting provinces with languages
    console.log('\n📋 Testing getProvincesWithLanguages()...');
    const provincesWithLanguages = await getProvincesWithLanguages();
    
    if (provincesWithLanguages && provincesWithLanguages.length > 0) {
      console.log(`✅ Successfully retrieved ${provincesWithLanguages.length} provinces with languages`);
      console.log('   Sample province with languages:');
      const sample = provincesWithLanguages[0];
      console.log(`   - ${sample.name} has ${sample.languages.length} languages`);
      
      if (sample.languages.length > 0) {
        console.log(`     First language: ${sample.languages[0].name} (${sample.languages[0].percentage}%)`);
        
        const dominantLanguage = sample.getDominantLanguage();
        console.log(`     Dominant language: ${dominantLanguage.name} (${dominantLanguage.percentage}%)`);
      }
      
      console.log('\n✅ getProvincesWithLanguages test passed!');
      return true;
    } else {
      console.log('⚠️ No provinces with languages found in database');
      return false;
    }
  } catch (error) {
    console.error('\n❌ getProvincesWithLanguages test failed:', error.message);
    console.error(error);
    return false;
  }
}

module.exports = { testGetProvincesWithLanguages };