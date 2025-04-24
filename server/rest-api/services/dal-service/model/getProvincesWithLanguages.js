/**
 * Models for provinces with languages
 * @module model/getProvincesWithLanguages
 */

/**
 * Language class representing a language with usage statistics
 */
class Language {
  /**
   * Create a language
   * @param {Object} data - The language data
   * @param {number} data.id - Language ID
   * @param {string} data.name - Language name
   * @param {number} data.household_count - Household count
   * @param {number} data.percentage - Usage percentage
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.householdCount = data.household_count;
    this.percentage = data.percentage;
  }
}

/**
 * ProvinceWithLanguages class representing a province with its languages
 */
class ProvinceWithLanguages {
  /**
   * Create a province with languages
   * @param {Object} data - The province data
   * @param {number} data.id - Province ID
   * @param {string} data.name - Province name
   * @param {string} data.history - Province history information
   * @param {Array} data.languages - Languages data
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.history = data.history;
    this.languages = Array.isArray(data.languages) 
      ? data.languages.map(lang => new Language(lang))
      : [];
  }

  /**
   * Get the dominant language in the province
   * @returns {Language|null} The language with highest percentage or null if no languages
   */
  getDominantLanguage() {
    if (!this.languages || this.languages.length === 0) {
      return null;
    }
    
    return this.languages.reduce((max, current) => 
      (current.percentage > max.percentage) ? current : max, this.languages[0]);
  }
}

module.exports = { ProvinceWithLanguages, Language };