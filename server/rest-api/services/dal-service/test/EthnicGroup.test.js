const { testConnection } = require('../config/db');
const EthnicGroupService = require('../data-service/EthnicGroupDAL');
const ProvinceService = require('../data-service/ProvinceDAL');

// Test suite setup and utilities
async function setupDatabaseConnection() {
    const connected = await testConnection();
    if (!connected) {
        throw new Error('Unable to connect to the database, tests cannot run');
    }
}

function verifyProvinceWithEthnicGroupsStructure(province) {
    expect(province).toHaveProperty('id');
    expect(province).toHaveProperty('name');
    expect(province).toHaveProperty('ethnicGroups');
    expect(Array.isArray(province.ethnicGroups)).toBe(true);
}

function verifyEthnicGroupStructure(ethnicGroup) {
    expect(ethnicGroup).toHaveProperty('id');
    expect(ethnicGroup).toHaveProperty('name');
}

function verifyArrayResult(result) {
    expect(Array.isArray(result)).toBe(true);
}

// Run database connection setup before all tests
beforeAll(async function() {
    await setupDatabaseConnection();
});

describe('EthnicGroup Service', function() {
    // Test getProvincesWithEthnicGroups
    describe('getProvincesWithEthnicGroups()', function() {
        it('should retrieve provinces with their associated ethnic groups', async function() {
            // Execute the function under test
            const provincesWithEthnicGroups = await EthnicGroupService.getProvincesWithEthnicGroups();
            
            // Verify we get an array
            verifyArrayResult(provincesWithEthnicGroups);
            
            // If we have provinces with ethnic groups, check structure
            if (provincesWithEthnicGroups.length > 0) {
                const province = provincesWithEthnicGroups[0];
                
                // Verify province structure
                verifyProvinceWithEthnicGroupsStructure(province);
                
                // If the province has ethnic groups, check structure
                if (province.ethnicGroups.length > 0) {
                    // Verify ethnic group structure
                    verifyEthnicGroupStructure(province.ethnicGroups[0]);
                }
            }
        });
    });
    
    // Test getEthnicGroupsByProvinceId
    describe('getEthnicGroupsByProvinceId()', function() {
        it('should retrieve ethnic groups for a specific province', async function() {
            // Setup for this test
            const provinces = await ProvinceService.getAllProvinces();
            
            // Skip if no provinces
            if (provinces.length === 0) {
                console.warn('No provinces found, skipping test');
                return;
            }
            
            // Execute the function under test
            const provinceId = provinces[0].id;
            const ethnicGroups = await EthnicGroupService.getEthnicGroupsByProvinceId(provinceId);
            
            // Verify results
            verifyArrayResult(ethnicGroups);
            
            // If we have ethnic groups, check structure
            if (ethnicGroups.length > 0) {
                verifyEthnicGroupStructure(ethnicGroups[0]);
            }
        });
    });
});