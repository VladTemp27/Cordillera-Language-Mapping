/**
 * Service for retrieving provinces with ethnic groups
 * @module data-service/getProvincesWithEthnicGroups
 */

const { query } = require('../config/db');
const { ProvinceWithEthnicGroups } = require('../model/getProvincesWithEthnicGroups');

/**
 * SQL query for retrieving provinces with ethnic groups
 */
const GET_PROVINCES_WITH_ETHNIC_GROUPS_QUERY = `
  SELECT p.id, p.name, p.history, 
         array_agg(json_build_object('id', eg.id, 'name', eg.name)) as ethnic_groups
  FROM provinces p
  JOIN province_ethnic_groups peg ON p.id = peg.province_id
  JOIN ethnic_groups eg ON peg.ethnic_group_id = eg.id
  GROUP BY p.id, p.name, p.history
  ORDER BY p.name ASC
`;

/**
 * Retrieve provinces with their associated ethnic groups
 * @returns {Promise<ProvinceWithEthnicGroups[]>} Array of provinces with ethnic groups
 */
async function getProvincesWithEthnicGroups() {
  try {
    const result = await query(GET_PROVINCES_WITH_ETHNIC_GROUPS_QUERY);
    return result.rows.map(row => new ProvinceWithEthnicGroups(row));
  } catch (error) {
    console.error('Error retrieving provinces with ethnic groups:', error);
    throw error;
  }
}

module.exports = { getProvincesWithEthnicGroups };