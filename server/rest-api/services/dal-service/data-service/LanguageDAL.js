/**
 * Service for language-related database operations
 * @module data-service/LanguageService
 */

const { query } = require('../config/db');
const { ProvinceWithLanguages } = require('../model/Language');

/**
 * Helper function to generate SQL for retrieving province details with languages.
 */
const getProvincesWithLanguagesQuery = () => {
  return `
    SELECT 
      p.id, 
      p.name, 
      p.history, 
      ${getLanguagesSubquery()} AS languages
    FROM provinces p
    JOIN province_languages pl ON p.id = pl.province_id
    JOIN languages l ON pl.language_id = l.id
    GROUP BY p.id, p.name, p.history
    ORDER BY p.name ASC
  `;
};

/**
 * Helper function to generate SQL for language details per province.
 */
const getLanguagesSubquery = () => {
  return `
    array_agg(
      json_build_object(
        'id', l.id, 
        'name', l.name, 
        'household_count', pl.household_count,
        'percentage', pl.percentage
      )
    )
  `;
};

/**
 * SQL query for retrieving languages by province ID.
 */
const getLanguagesByProvinceIdQuery = (provinceId) => {
  return `
    SELECT
      l.id, 
      l.name, 
      pl.household_count, 
      pl.percentage
    FROM languages l
    JOIN province_languages pl ON l.id = pl.language_id
    WHERE pl.province_id = $1
    ORDER BY pl.percentage DESC
  `;
};

/**
 * Retrieve provinces with their associated languages
 * @returns {Promise<ProvinceWithLanguages[]>} Array of provinces with languages
 */
async function getProvincesWithLanguages() {
  try {
    const result = await query(getProvincesWithLanguagesQuery());
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
    const result = await query(getLanguagesByProvinceIdQuery(provinceId), [provinceId]);
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