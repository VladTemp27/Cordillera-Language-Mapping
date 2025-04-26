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
      `,
    GET_BY_NAME: `
        SELECT id, name, history
        FROM provinces
        WHERE LOWER(name) LIKE LOWER($1)
        ORDER BY name ASC
    `,
    GET_BY_LANGUAGE: `
        SELECT p.id, p.name, p.history
        FROM provinces p
        JOIN province_languages pl ON p.id = pl.province_id
        WHERE pl.language_id = $1
        ORDER BY p.name ASC
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

/**
 * Retrieve provinces by matching name pattern
 * @param {string} namePattern - Name pattern to search for (can include SQL wildcards, e.g. '%name%')
 * @returns {Promise<Province[]>} Array of matching Province objects
 */
async function getProvincesByName(namePattern) {
    try {
        const result = await query(PROVINCE_QUERIES.GET_BY_NAME, [namePattern]);
        return result.rows.map(row => new Province(row));
    } catch (error) {
        console.error(`Error retrieving provinces with name pattern '${namePattern}':`, error);
        throw error;
    }
}

/**
 * Retrieve provinces by language ID
 * @param {number} languageId - ID of the language to find provinces for
 * @returns {Promise<Province[]>} Array of Province objects where the language is spoken
 */
async function getProvincesByLanguage(languageId) {
    try {
        const result = await query(PROVINCE_QUERIES.GET_BY_LANGUAGE, [languageId]);
        return result.rows.map(row => new Province(row));
    } catch (error) {
        console.error(`Error retrieving provinces for language ID ${languageId}:`, error);
        throw error;
    }
}

module.exports = {
    getAllProvinces,
    getProvinceById,
    getProvincesByName,
    getProvincesByLanguage
};