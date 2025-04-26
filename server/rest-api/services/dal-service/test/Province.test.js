const { testConnection } = require('../config/db');
const ProvinceService = require('../data-service/ProvinceDAL');

// Test suite setup and utilities
async function setupDatabaseConnection() {
  const connected = await testConnection();
  if (!connected) {
    throw new Error('Unable to connect to the database, tests cannot run');
  }
}

function verifyProvinceStructure(province) {
  expect(province).toHaveProperty('id');
  expect(province).toHaveProperty('name');
  expect(province).toHaveProperty('history');
}

function verifyProvinceMatch(actualProvince, expectedProvince) {
  expect(actualProvince).toBeTruthy();
  expect(actualProvince.id).toBe(expectedProvince.id);
  expect(actualProvince.name).toBe(expectedProvince.name);
}

// Run database connection setup before all tests
beforeAll(async function() {
  await setupDatabaseConnection();
});

describe('Province Service', function() {
  let allProvinces;

  // Test getAllProvinces
  describe('getAllProvinces()', function() {
    it('should retrieve all provinces from the database', async function() {
      // Execute the function under test
      allProvinces = await ProvinceService.getAllProvinces();

      // Verify results
      expect(Array.isArray(allProvinces)).toBe(true);
      expect(allProvinces.length).toBeGreaterThan(0);
      
      // Verify structure of first province
      verifyProvinceStructure(allProvinces[0]);
    });
  });

  // Test getProvinceById
  describe('getProvinceById()', function() {
    it('should retrieve a province by ID', async function() {
      // Setup for this test
      const testId = allProvinces[0].id;
      
      // Execute the function under test
      const province = await ProvinceService.getProvinceById(testId);

      // Verify results
      verifyProvinceMatch(province, allProvinces[0]);
    });

    it('should return null for non-existent province ID', async function() {
      // Setup for this test
      const nonExistentId = 9999;
      
      // Execute the function under test
      const province = await ProvinceService.getProvinceById(nonExistentId);

      // Verify results
      expect(province).toBeNull();
    });
  });

  // Test getProvincesByName
  describe('getProvincesByName()', function() {
    it('should retrieve provinces matching a name pattern', async function() {
      // Assuming there's a province with "Mountain" in the name
      const namePattern = '%Mountain%';
      
      // Execute the function under test
      const provinces = await ProvinceService.getProvincesByName(namePattern);
      
      // Verify results
      expect(Array.isArray(provinces)).toBe(true);
      expect(provinces.length).toBeGreaterThan(0);
      
      // Check that all returned provinces match the pattern
      provinces.forEach(province => {
        expect(province.name.toLowerCase()).toContain('mountain');
        verifyProvinceStructure(province);
      });
    });
    
    it('should return an empty array for non-matching name patterns', async function() {
      // Setup with a name that shouldn't exist
      const nonExistentPattern = '%NonExistentProvinceName%';
      
      // Execute the function under test
      const provinces = await ProvinceService.getProvincesByName(nonExistentPattern);
      
      // Verify results
      expect(Array.isArray(provinces)).toBe(true);
      expect(provinces.length).toBe(0);
    });
  });
  
  // Test getProvincesByLanguage
  describe('getProvincesByLanguage()', function() {
    it('should retrieve provinces where a specific language is spoken', async function() {
      // Using a common language in the region (Ilocano)
      const languageName = 'Ilocano';
      
      // Execute the function under test
      const provinces = await ProvinceService.getProvincesByLanguage(languageName);
      
      // Verify results
      expect(Array.isArray(provinces)).toBe(true);
      expect(provinces.length).toBeGreaterThan(0);
      
      // Verify structure of returned provinces
      provinces.forEach(province => {
        verifyProvinceStructure(province);
      });
    });
    
    it('should return an empty array for non-existent language', async function() {
      // Setup with a language that shouldn't exist
      const nonExistentLanguage = 'NonExistentLanguage';
      
      // Execute the function under test
      const provinces = await ProvinceService.getProvincesByLanguage(nonExistentLanguage);
      
      // Verify results
      expect(Array.isArray(provinces)).toBe(true);
      expect(provinces.length).toBe(0);
    });
  });
});