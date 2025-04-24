const {
	testConnection
} = require('../config/db');
const LanguageService = require('../data-service/LanguageDAL');
const ProvinceService = require('../data-service/ProvinceDAL');

// Ensure database connection before all tests
beforeAll(async () => {
	const connected = await testConnection();
	if (!connected) {
		throw new Error('Unable to connect to the database, tests cannot run');
	}
});

describe('Language Service', () => {
	// Test getProvincesWithLanguages
	describe('getProvincesWithLanguages()', () => {
		it('should retrieve provinces with their associated languages', async () => {
			const provincesWithLanguages = await LanguageService.getProvincesWithLanguages();

			// Check that we get an array
			expect(Array.isArray(provincesWithLanguages)).toBe(true);

			// If we have provinces with languages, check structure
			if (provincesWithLanguages.length > 0) {
				const province = provincesWithLanguages[0];

				expect(province).toHaveProperty('id');
				expect(province).toHaveProperty('name');
				expect(province).toHaveProperty('languages');
				expect(Array.isArray(province.languages)).toBe(true);

				// If the province has languages, check structure
				if (province.languages.length > 0) {
					const language = province.languages[0];
					expect(language).toHaveProperty('id');
					expect(language).toHaveProperty('name');
					expect(language).toHaveProperty('householdCount');
					expect(language).toHaveProperty('percentage');
				}

				// Test getDominantLanguage method if there are languages
				if (province.languages.length > 0) {
					const dominantLanguage = province.getDominantLanguage();
					expect(dominantLanguage).toBeTruthy();
					expect(dominantLanguage).toHaveProperty('name');
					expect(dominantLanguage).toHaveProperty('percentage');
				}
			}
		});
	});

	// Test getLanguagesByProvinceId
	describe('getLanguagesByProvinceId()', () => {
		it('should retrieve languages for a specific province', async () => {
			// First get all provinces
			const provinces = await ProvinceService.getAllProvinces();

			// Use the first province for testing
			if (provinces.length > 0) {
				const provinceId = provinces[0].id;
				const languages = await LanguageService.getLanguagesByProvinceId(provinceId);

				// Check that we get an array (even if empty)
				expect(Array.isArray(languages)).toBe(true);

				// If we have languages, check structure
				if (languages.length > 0) {
					const language = languages[0];
					expect(language).toHaveProperty('id');
					expect(language).toHaveProperty('name');
					expect(language).toHaveProperty('percentage');
				}
			} else {
				// Skip test if no provinces
				console.warn('No provinces found, skipping test');
			}
		});
	});
});