// Global setup for Jest tests
const {
	closePool
} = require('./services/dal-service/config/db');

process.env.NODE_ENV = 'test';

// Increase timeout for database tests
jest.setTimeout(10000);

// Global teardown for all tests
afterAll(async () => {
	// Close database connections
	await closePool();

	// Give time for any open connections to close
	await new Promise(resolve => setTimeout(resolve, 500));
});