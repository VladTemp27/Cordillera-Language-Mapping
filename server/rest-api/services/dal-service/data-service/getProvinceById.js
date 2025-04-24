/**
 * Service for retrieving a province by ID
 * @module data-service/getProvinceById
 */

const { query } = require('../config/db');
const DetailedProvince = require('../model/getProvinceById');

/**
 * SQL query template for retrieving a province by ID
 */
const GET_PROVINCE_BY_ID_QUERY = `
  SELECT id, name, history
  FROM provinces
  WHERE id = $1
`;

/**
 * Retrieve a province by its ID
 * @param {number} provinceId - ID of the province to retrieve
 * @returns {Promise<DetailedProvince|null>} Province object or null if not found
 */
async function getProvinceById(provinceId) {
  try {
    const result = await query(GET_PROVINCE_BY_ID_QUERY, [provinceId]);
    return result.rows.length > 0 ? new DetailedProvince(result.rows[0]) : null;
  } catch (error) {
    console.error(`Error retrieving province with ID ${provinceId}:`, error);
    throw error;
  }
}

module.exports = { getProvinceById };