const {
	testConnection
} = require('../config/db');
const EthnicGroupService = require('../data-service/EthnicGroup');
const ProvinceService = require('../data-service/Province');

// Ensure database connection before all tests
beforeAll(async () => {
	const connected = await testConnection();
	if (!connected) {
		throw new Error('Unable to connect to the database, tests cannot run');
	}
});

describe('EthnicGroup Service', () => {
	// Test getProvincesWithEthnicGroups
	describe('getProvincesWithEthnicGroups()', () => {
		it('should retrieve provinces with their associated ethnic groups', async () => {
			const provincesWithEthnicGroups = await EthnicGroupService.getProvincesWithEthnicGroups();

			// Check that we get an array
			expect(Array.isArray(provincesWithEthnicGroups)).toBe(true);

			// If we have provinces with ethnic groups, check structure
			if (provincesWithEthnicGroups.length > 0) {
				const province = provincesWithEthnicGroups[0];

				expect(province).toHaveProperty('id');
				expect(province).toHaveProperty('name');
				expect(province).toHaveProperty('ethnicGroups');
				expect(Array.isArray(province.ethnicGroups)).toBe(true);

				// If the province has ethnic groups, check structure
				if (province.ethnicGroups.length > 0) {
					const ethnicGroup = province.ethnicGroups[0];
					expect(ethnicGroup).toHaveProperty('id');
					expect(ethnicGroup).toHaveProperty('name');
				}
			}
		});
	});

	// Test getEthnicGroupsByProvinceId
	describe('getEthnicGroupsByProvinceId()', () => {
		it('should retrieve ethnic groups for a specific province', async () => {
			// First get all provinces
			const provinces = await ProvinceService.getAllProvinces();

			// Use the first province for testing
			if (provinces.length > 0) {
				const provinceId = provinces[0].id;
				const ethnicGroups = await EthnicGroupService.getEthnicGroupsByProvinceId(provinceId);

				// Check that we get an array (even if empty)
				expect(Array.isArray(ethnicGroups)).toBe(true);

				// If we have ethnic groups, check structure
				if (ethnicGroups.length > 0) {
					const ethnicGroup = ethnicGroups[0];
					expect(ethnicGroup).toHaveProperty('id');
					expect(ethnicGroup).toHaveProperty('name');
				}
			} else {
				// Skip test if no provinces
				console.warn('No provinces found, skipping test');
			}
		});
	});
});