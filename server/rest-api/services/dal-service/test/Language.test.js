const { testConnection } = require('../config/db');
const LanguageService = require('../data-service/LanguageDAL');
const ProvinceService = require('../data-service/ProvinceDAL');

// Test suite setup and utilities
async function setupDatabaseConnection() {
    const connected = await testConnection();
    if (!connected) {
        throw new Error('Unable to connect to the database, tests cannot run');
    }
}

function verifyProvinceWithLanguagesStructure(province) {
    expect(province).toHaveProperty('id');
    expect(province).toHaveProperty('name');
    expect(province).toHaveProperty('languages');
    expect(Array.isArray(province.languages)).toBe(true);
}

function verifyLanguageStructure(language) {
    expect(language).toHaveProperty('id');
    expect(language).toHaveProperty('name');
    expect(language).toHaveProperty('percentage');
}

function verifyDetailedLanguageStructure(language) {
    verifyLanguageStructure(language);
    expect(language).toHaveProperty('householdCount');
}

function verifyDominantLanguage(dominantLanguage) {
    expect(dominantLanguage).toBeTruthy();
    expect(dominantLanguage).toHaveProperty('name');
    expect(dominantLanguage).toHaveProperty('percentage');
}

// Run database connection setup before all tests
beforeAll(async function() {
    await setupDatabaseConnection();
});

describe('Language Service', function() {
    // Test getProvincesWithLanguages
    describe('getProvincesWithLanguages()', function() {
        it('should retrieve provinces with their associated languages', async function() {
            // Execute the function under test
            const provincesWithLanguages = await LanguageService.getProvincesWithLanguages();

            // Verify we get an array
            expect(Array.isArray(provincesWithLanguages)).toBe(true);

            // If we have provinces with languages, check structure
            if (provincesWithLanguages.length > 0) {
                const province = provincesWithLanguages[0];
                
                // Verify province structure
                verifyProvinceWithLanguagesStructure(province);

                // If the province has languages, check language structure
                if (province.languages.length > 0) {
                    const language = province.languages[0];
                    verifyDetailedLanguageStructure(language);
                    
                    // Test getDominantLanguage method
                    const dominantLanguage = province.getDominantLanguage();
                    verifyDominantLanguage(dominantLanguage);
                }
            }
        });
    });

    // Test getLanguagesByProvinceId
    describe('getLanguagesByProvinceId()', function() {
        it('should retrieve languages for a specific province', async function() {
            // Setup for this test
            const provinces = await ProvinceService.getAllProvinces();

            // Skip if no provinces
            if (provinces.length === 0) {
                console.warn('No provinces found, skipping test');
                return;
            }
            
            // Execute the function under test
            const provinceId = provinces[0].id;
            const languages = await LanguageService.getLanguagesByProvinceId(provinceId);

            // Verify results
            expect(Array.isArray(languages)).toBe(true);

            // If we have languages, check structure
            if (languages.length > 0) {
                verifyLanguageStructure(languages[0]);
            }
        });
    });
});