/**
 * Models for provinces with ethnic groups
 * @module model/getProvincesWithEthnicGroups
 */

/**
 * EthnicGroup class representing an ethnic group
 */
class EthnicGroup {
  /**
   * Create an ethnic group
   * @param {Object} data - The ethnic group data
   * @param {number} data.id - Ethnic group ID
   * @param {string} data.name - Ethnic group name
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}

/**
 * ProvinceWithEthnicGroups class representing a province with its ethnic groups
 */
class ProvinceWithEthnicGroups {
  /**
   * Create a province with ethnic groups
   * @param {Object} data - The province data
   * @param {number} data.id - Province ID
   * @param {string} data.name - Province name
   * @param {string} data.history - Province history information
   * @param {Array} data.ethnic_groups - Ethnic groups data
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.history = data.history;
    this.ethnicGroups = Array.isArray(data.ethnic_groups) 
      ? data.ethnic_groups.map(eg => new EthnicGroup(eg))
      : [];
  }
}

module.exports = { ProvinceWithEthnicGroups, EthnicGroup };