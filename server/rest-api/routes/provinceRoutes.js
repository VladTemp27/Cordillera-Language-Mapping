const express = require('express');
const { getAllProvinces, getProvinceById, getProvincesByName, getProvincesByLanguage } = require("../services/dal-service/data-service/ProvinceDAL");
const { getEthnicGroupsByProvinceId } = require("../services/dal-service/data-service/EthnicGroupDAL");
const { getLanguagesByProvinceId } = require("../services/dal-service/data-service/LanguageDAL");

const router = express.Router();

router.get('/getall', async (req, res) => {
    console.log('Fetching all provinces');
    try {
        const provinces = await getAllProvinces();
        const formattedProvinces = {
            provinces: await Promise.all(provinces.map(async (province) => {
                const ethnicGroups = await getEthnicGroupsByProvinceId(province.id);
                const languages = await getLanguagesByProvinceId(province.id);
                return {
                    id: province.id,
                    name: province.name,
                    history: province.history,
                    ethnicGroups: ethnicGroups.map(eg => eg.name),
                    languages: languages.map(lang => lang.name)
                };
            }))
        };
        res.json(formattedProvinces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/province/:id', async (req, res) => {
    try {
        const provinceId = parseInt(req.params.id);
        if (isNaN(provinceId)) {
            return res.status(400).json({ error: 'Invalid province ID' });
        }
        
        const province = await getProvinceById(provinceId);
        const ethnicGroups = await getEthnicGroupsByProvinceId(provinceId);
        const languages = await getLanguagesByProvinceId(provinceId);
        
        const formattedResponse = {
            provinces: [{
                name: province.name,
                history: province.history,
                ethnicGroups: ethnicGroups.map(eg => eg.name),
                languages: languages.map(lang => lang.name)
            }]
        };
        
        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/search/province', async (req, res) => {
    try {
        if (!req.query.name) {
            return res.status(400).json({ 
                error: 'Province name is required as a query parameter' 
            });
        }

        const namePattern = `%${req.query.name}%`;
        const provinces = await getProvincesByName(namePattern);
        const formattedResponse = {
            searchTerm: req.query.name,
            provinces: await Promise.all(provinces.map(async (province) => {
                const ethnicGroups = await getEthnicGroupsByProvinceId(province.id);
                const languages = await getLanguagesByProvinceId(province.id);
                return {
                    id: province.id,
                    name: province.name,
                    history: province.history,
                    ethnicGroups: ethnicGroups.map(eg => eg.name),
                    languages: languages.map(lang => lang.name)
                };
            }))
        };
        
        res.json(formattedResponse);
    } catch (error) {
        console.error('Route error: search provinces by name:', error);
        res.status(500).json({ 
            message: 'Internal server error while searching provinces' 
        });
    }
});

router.get('/search/language', async (req, res) => {
    try {
        if (!req.query.name) {
            return res.status(400).json({ 
                error: 'Language name is required as a query parameter' 
            });
        }

        const provinces = await getProvincesByLanguage(req.query.name);
        const formattedResponse = {
            searchTerm: req.query.name,
            provinces: await Promise.all(provinces.map(async (province) => {
                const ethnicGroups = await getEthnicGroupsByProvinceId(province.id);
                const languages = await getLanguagesByProvinceId(province.id);
                return {
                    id: province.id,
                    name: province.name,
                    history: province.history,
                    ethnicGroups: ethnicGroups.map(eg => eg.name),
                    languages: languages.map(lang => lang.name)
                };
            }))
        };
        
        res.json(formattedResponse);
    } catch (error) {
        console.error('Route error: search provinces by language:', error);
        res.status(500).json({ 
            message: 'Internal server error while searching provinces by language' 
        });
    }
});


module.exports = router;
