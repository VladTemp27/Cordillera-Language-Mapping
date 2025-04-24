/**
 * Script to run all Jest tests
 */
console.log('===== CORDILLERA MAPPING PROJECT =====');
console.log('Running tests using Jest...');

const { execSync } = require('child_process');

try {
  // Execute Jest to run all tests
  execSync('npx jest', { stdio: 'inherit' });
  console.log('\n✅ All tests completed!');
  process.exit(0);
} catch (error) {
  console.error('\n❌ Tests failed!');
  process.exit(1);
}
