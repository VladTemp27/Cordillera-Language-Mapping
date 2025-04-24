const {
	testConnection
} = require('../config/db');
const ProvinceService = require('../data-service/ProvinceDAL');

// Ensure database connection before all tests
beforeAll(async () => {
	const connected = await testConnection();
	if (!connected) {
		throw new Error('Unable to connect to the database, tests cannot run');
	}
});

describe('Province Service', () => {
	let allProvinces;

	// Test getAllProvinces
	describe('getAllProvinces()', () => {
		it('should retrieve all provinces from the database', async () => {
			allProvinces = await ProvinceService.getAllProvinces();

			// Check that we get an array
			expect(Array.isArray(allProvinces)).toBe(true);

			// Check that we have at least one province
			expect(allProvinces.length).toBeGreaterThan(0);

			// Check province object structure
			const province = allProvinces[0];
			expect(province).toHaveProperty('id');
			expect(province).toHaveProperty('name');
			expect(province).toHaveProperty('history');
		});
	});

	// Test getProvinceById
	describe('getProvinceById()', () => {
		it('should retrieve a province by ID', async () => {
			// Use the first province from previous test
			const testId = allProvinces[0].id;
			const province = await ProvinceService.getProvinceById(testId);

			// Check that we got a province object
			expect(province).toBeTruthy();
			expect(province.id).toBe(testId);
			expect(province.name).toBe(allProvinces[0].name);
		});

		it('should return null for non-existent province ID', async () => {
			const nonExistentId = 9999;
			const province = await ProvinceService.getProvinceById(nonExistentId);

			// Check that we got null
			expect(province).toBeNull();
		});
	});
});