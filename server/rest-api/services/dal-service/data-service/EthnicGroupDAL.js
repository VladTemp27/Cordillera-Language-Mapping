/**
 * Service for ethnic group-related database operations
 * @module data-service/EthnicGroupService
 */

const {
	query
} = require('../config/db');
const {
	ProvinceWithEthnicGroups
} = require('../model/EthnicGroup');

/**
 * SQL queries for ethnic group operations
 */
const ETHNIC_GROUP_QUERIES = {
	GET_PROVINCES_WITH_ETHNIC_GROUPS: `
    SELECT p.id, p.name, p.history, 
           array_agg(json_build_object('id', eg.id, 'name', eg.name)) as ethnic_groups
    FROM provinces p
    JOIN province_ethnic_groups peg ON p.id = peg.province_id
    JOIN ethnic_groups eg ON peg.ethnic_group_id = eg.id
    GROUP BY p.id, p.name, p.history
    ORDER BY p.name ASC
  `,
	GET_ETHNIC_GROUPS_BY_PROVINCE_ID: `
    SELECT eg.id, eg.name
    FROM ethnic_groups eg
    JOIN province_ethnic_groups peg ON eg.id = peg.ethnic_group_id
    WHERE peg.province_id = $1
    ORDER BY eg.name
  `
};

/**
 * Retrieve provinces with their associated ethnic groups
 * @returns {Promise<ProvinceWithEthnicGroups[]>} Array of provinces with ethnic groups
 */
async function getProvincesWithEthnicGroups() {
	try {
		const result = await query(ETHNIC_GROUP_QUERIES.GET_PROVINCES_WITH_ETHNIC_GROUPS);
		return result.rows.map(row => new ProvinceWithEthnicGroups(row));
	} catch (error) {
		console.error('Error retrieving provinces with ethnic groups:', error);
		throw error;
	}
}

/**
 * Get ethnic groups in a specific province
 * @param {number} provinceId - ID of the province
 * @returns {Promise<EthnicGroup[]>} Array of ethnic groups in the province
 */
async function getEthnicGroupsByProvinceId(provinceId) {
	try {
		const result = await query(ETHNIC_GROUP_QUERIES.GET_ETHNIC_GROUPS_BY_PROVINCE_ID, [provinceId]);
		return result.rows;
	} catch (error) {
		console.error(`Error retrieving ethnic groups for province ID ${provinceId}:`, error);
		throw error;
	}
}

module.exports = {
	getProvincesWithEthnicGroups,
	getEthnicGroupsByProvinceId
};