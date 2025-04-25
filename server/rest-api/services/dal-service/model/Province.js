/**
 * Province models - contains all province-related classes
 * @module model/Province
 */

/**
 * Base Province class for basic province information
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

/**
 * DetailedProvince class for detailed province information
 * @extends Province
 */
class DetailedProvince extends Province {
	/**
	 * Create a detailed province
	 * @param {Object} provinceData - The province data
	 */
	constructor(provinceData) {
		super(provinceData);
		// Additional properties for detailed province can be added here
	}
}

module.exports = {
	Province,
	DetailedProvince
};