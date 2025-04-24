/**
 * Model for detailed province data
 * @module model/getProvinceById
 */

/**
 * DetailedProvince class for detailed province information
 */
class DetailedProvince {
  /**
   * Create a detailed province
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

module.exports = DetailedProvince;