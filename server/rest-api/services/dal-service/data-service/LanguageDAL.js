/**
 * Service for language-related database operations
 * @module data-service/LanguageService
 */

const {
	query
} = require('../config/db');
const {
	ProvinceWithLanguages
} = require('../model/Language');

/**
 * SQL query for retrieving provinces with languages
 */
const LANGUAGE_QUERIES = {
	GET_PROVINCES_WITH_LANGUAGES: `
    SELECT p.id, p.name, p.history,
           array_agg(json_build_object(
             'id', l.id, 
             'name', l.name, 
             'household_count', pl.household_count,
             'percentage', pl.percentage
           )) as languages
    FROM provinces p
    JOIN province_languages pl ON p.id = pl.province_id
    JOIN languages l ON pl.language_id = l.id
    GROUP BY p.id, p.name, p.history
    ORDER BY p.name ASC
  `,
	GET_LANGUAGES_BY_PROVINCE_ID: `
    SELECT l.id, l.name, pl.household_count, pl.percentage
    FROM languages l
    JOIN province_languages pl ON l.id = pl.language_id
    WHERE pl.province_id = $1
    ORDER BY pl.percentage DESC
  `
};

/**
 * Retrieve provinces with their associated languages
 * @returns {Promise<ProvinceWithLanguages[]>} Array of provinces with languages
 */
async function getProvincesWithLanguages() {
	try {
		const result = await query(LANGUAGE_QUERIES.GET_PROVINCES_WITH_LANGUAGES);
		return result.rows.map(row => new ProvinceWithLanguages(row));
	} catch (error) {
		console.error('Error retrieving provinces with languages:', error);
		throw error;
	}
}

/**
 * Get languages spoken in a specific province
 * @param {number} provinceId - ID of the province
 * @returns {Promise<Language[]>} Array of languages in the province
 */
async function getLanguagesByProvinceId(provinceId) {
	try {
		const result = await query(LANGUAGE_QUERIES.GET_LANGUAGES_BY_PROVINCE_ID, [provinceId]);
		return result.rows;
	} catch (error) {
		console.error(`Error retrieving languages for province ID ${provinceId}:`, error);
		throw error;
	}
}

module.exports = {
	getProvincesWithLanguages,
	getLanguagesByProvinceId
};