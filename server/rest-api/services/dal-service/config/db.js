// Load environment variables from .env file
require('dotenv').config({
	path: '../../../.env'
});
const {
	Pool
} = require('pg');

// Database configuration based on Docker Compose settings
const pool = new Pool({
	user: process.env.DB_USER || 'admin',
	host: process.env.DB_HOST || 'localhost',
	database: process.env.DB_NAME || 'lang_map',
	password: process.env.DB_PASSWORD || 'postgres',
	port: process.env.DB_PORT || 5432,
});

// Test database connection
const testConnection = async () => {
	try {
		const client = await pool.connect();
		console.log('Successfully connected to PostgreSQL database');
		client.release();
		return true;
	} catch (err) {
		console.error('Database connection error', err.stack);
		return false;
	}
};

// Helper function to execute queries
const query = async (text, params) => {
	try {
		const start = Date.now();
		const res = await pool.query(text, params);
		const duration = Date.now() - start;
		console.log('Executed query', {
			text,
			duration,
			rows: res.rowCount
		});
		return res;
	} catch (err) {
		console.error('Error executing query', err.stack);
		throw err;
	}
};

/**
 * Close all database connections
 * @returns {Promise<void>}
 */
async function closePool() {
	try {
		if (pool) {
			await pool.end();
			console.log('Database connection pool has been closed');
		}
	} catch (error) {
		console.error('Error closing database connection pool:', error);
		throw error;
	}
}

// Export the closePool function
module.exports = {
	query,
	testConnection,
	closePool // Add this export
};