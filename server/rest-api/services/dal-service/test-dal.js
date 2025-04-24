const { testConnection, query } = require('./config/db');

/**
 * Test database connectivity and query functionality
 */
async function testDatabaseAccess() {
  console.log('===== Testing Database Access Layer =====');
  
  try {
    // Test 1: Verify database connection
    console.log('\n📋 Testing database connection...');
    const connected = await testConnection();
    
    if (!connected) {
      console.error('❌ Failed to connect to database');
      return;
    }
    console.log('✅ Successfully connected to database');
    
    // Test 2: Test basic query functionality
    console.log('\n📋 Testing basic query execution...');
    const timeResult = await query('SELECT NOW() as current_time');
    console.log(`✅ Database time: ${timeResult.rows[0].current_time}`);
    
    // Test 3: Test parameterized query
    console.log('\n📋 Testing parameterized query...');
    const paramResult = await query('SELECT $1::text as message', ['Database connection successful!']);
    console.log(`✅ ${paramResult.rows[0].message}`);
    
    // Test 4: Test database schema - check if tables exist
    console.log('\n📋 Testing database schema...');
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    if (tablesResult.rows.length === 0) {
      console.log('⚠️ No tables found in database');
    } else {
      console.log('✅ Found tables in database:');
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
    }
    
    console.log('\n✅ All database tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Database test failed:', error.message);
    console.error(error);
  }
}

// Execute tests if this file is run directly
if (require.main === module) {
  testDatabaseAccess()
    .then(() => {
      console.log('\nTests completed.');
    })
    .catch(err => {
      console.error('Test runner encountered an error:', err);
      process.exit(1);
    });
} else {
  // Export for use in other files
  module.exports = { testDatabaseAccess };
}