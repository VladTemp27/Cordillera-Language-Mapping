/**
 * Service for retrieving all provinces
 * @module data-service/getAllProvinces
 */

const { query } = require('../config/db');
const Province = require('../model/getAllProvinces');

/**
 * SQL query for retrieving all provinces
 */
const GET_ALL_PROVINCES_QUERY = `
  SELECT id, name, history
  FROM provinces
  ORDER BY name ASC
`;

/**
 * Retrieve all provinces from the database
 * @returns {Promise<Province[]>} Array of Province objects
 */
async function getAllProvinces() {
  try {
    const result = await query(GET_ALL_PROVINCES_QUERY);
    return result.rows.map(row => new Province(row));
  } catch (error) {
    console.error('Error retrieving all provinces:', error);
    throw error;
  }
}

module.exports = { getAllProvinces };