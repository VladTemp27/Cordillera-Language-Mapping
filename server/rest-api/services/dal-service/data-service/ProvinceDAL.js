/**
 * Service for province-related database operations
 * @module data-service/ProvinceService
 */

const {
	query
} = require('../config/db');
const {
	Province,
	DetailedProvince
} = require('../model/Province');

/**
 * SQL queries for province operations
 */
const PROVINCE_QUERIES = {
	GET_ALL: `
		SELECT id, name, history
		FROM provinces
		ORDER BY name ASC
  	`,
	GET_BY_ID: `
		SELECT id, name, history
		FROM provinces
		WHERE id = $1
  	`
};

/**
 * Retrieve all provinces from the database
 * @returns {Promise<Province[]>} Array of Province objects
 */
async function getAllProvinces() {
	try {
		const result = await query(PROVINCE_QUERIES.GET_ALL);
		return result.rows.map(row => new Province(row));
	} catch (error) {
		console.error('Error retrieving all provinces:', error);
		throw error;
	}
}

/**
 * Retrieve a province by its ID
 * @param {number} provinceId - ID of the province to retrieve
 * @returns {Promise<DetailedProvince|null>} Province object or null if not found
 */
async function getProvinceById(provinceId) {
	try {
		const result = await query(PROVINCE_QUERIES.GET_BY_ID, [provinceId]);
		return result.rows.length > 0 ? new DetailedProvince(result.rows[0]) : null;
	} catch (error) {
		console.error(`Error retrieving province with ID ${provinceId}:`, error);
		throw error;
	}
}

module.exports = {
	getAllProvinces,
	getProvinceById
};