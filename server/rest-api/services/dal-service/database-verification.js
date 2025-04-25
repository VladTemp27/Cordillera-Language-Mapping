const {
	testConnection,
	query
  } = require('./config/db');
  
  /**
   * Test database connectivity and verify data exists
   */
  async function testDatabaseAccess() {
	console.log('===== Testing Database Access Layer =====');
  
	try {
	  // Test 1: Verify database connection
	  console.log('\n📋 Testing database connection...');
	  const connected = await testConnection();
  
	  if (!connected) {
		console.error('❌ Failed to connect to database');
		return false;
	  }
	  console.log('✅ Successfully connected to database');
  
	  // Test 2: Check if tables exist and contain data
	  console.log('\n📋 Checking database tables and data...');
  
	  // Get list of tables
	  const tablesResult = await query(`
		SELECT table_name 
		FROM information_schema.tables 
		WHERE table_schema = 'public'
		ORDER BY table_name;
	  `);
  
	  if (tablesResult.rows.length === 0) {
		console.log('⚠️ No tables found in database');
		return false;
	  }
  
	  console.log(`✅ Found ${tablesResult.rows.length} tables in database.`);
  
	  // Check for data in key tables
	  const tableChecks = [];
  
	  for (const row of tablesResult.rows) {
		const tableName = row.table_name;
		const countResult = await query(`SELECT COUNT(*) as count FROM ${tableName}`);
		const count = parseInt(countResult.rows[0].count);
  
		tableChecks.push({
		  table: tableName,
		  rowCount: count,
		  hasData: count > 0
		});
  
		console.log(`   - ${tableName}: ${count} rows ${count > 0 ? '✅' : '⚠️'}`);
	  }
  
	  // Check if all tables have data
	  const allTablesHaveData = tableChecks.every(check => check.hasData);
  
	  if (allTablesHaveData) {
		console.log('\n✅ All tables contain data!');
	  } else {
		console.log('\n⚠️ Some tables are empty. You may need to populate them.');
	  }
  
	  console.log('\n✅ Database verification completed successfully!');
	  return true;
	} catch (error) {
	  console.error('\n❌ Database verification failed:', error.message);
	  console.error(error);
	  return false;
	}
  }
  
  // Execute tests if this file is run directly
  if (require.main === module) {
	testDatabaseAccess()
	  .then((success) => {
		console.log('\nVerification completed.');
		process.exit(success ? 0 : 1);
	  })
	  .catch(err => {
		console.error('Verification process encountered an error:', err);
		process.exit(1);
	  });
  } else {
	// Export for use in other files
	module.exports = {
	  testDatabaseAccess
	};
  }
  