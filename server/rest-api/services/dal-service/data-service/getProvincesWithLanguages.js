/**
 * Service for retrieving provinces with languages
 * @module data-service/getProvincesWithLanguages
 */

const { query } = require('../config/db');
const { ProvinceWithLanguages } = require('../model/getProvincesWithLanguages');

/**
 * SQL query for retrieving provinces with languages
 */
const GET_PROVINCES_WITH_LANGUAGES_QUERY = `
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
`;

/**
 * Retrieve provinces with their associated languages
 * @returns {Promise<ProvinceWithLanguages[]>} Array of provinces with languages
 */
async function getProvincesWithLanguages() {
  try {
    const result = await query(GET_PROVINCES_WITH_LANGUAGES_QUERY);
    return result.rows.map(row => new ProvinceWithLanguages(row));
  } catch (error) {
    console.error('Error retrieving provinces with languages:', error);
    throw error;
  }
}

module.exports = { getProvincesWithLanguages };