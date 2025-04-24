/**
 * Model for basic province data
 * @module model/getAllProvinces
 */

/**
 * Province class for basic province information
 */
class Province {
  /**
   * Create a province
   * @param {Object} provinceData - The province data
   * @param {number} provinceData.id - Province ID
   * @param {string} provinceData.name - Province name
   * @param {string} provinceData.history - Province history information
   */
  constructor(provinceData) {
    this.id = provinceData.id;
    this.name = provinceData.name;
    this.history = provinceData.history;
  }
}

module.exports = Province;