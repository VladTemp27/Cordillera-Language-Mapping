const express = require('express');
const {getProvincesWithLanguages, getLanguagesByProvinceId } = require("../services/dal-service/data-service/LanguageDAL");

const router = express.Router();

// Raw unformatted response for fetching all provinces with languages
router.get('/raw/getAll', async (req, res) => {
    try {
        const languages = await getProvincesWithLanguages();
        res.json(languages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Formatted response for fetching all provinces with languages
router.get('/getAll', async (req, res) => {
    try {
        const languages = await getProvincesWithLanguages();
        const formattedResponse = {
            provinces: languages.map(province => ({
                name: province.name,
                history: province.history,
                languages: province.languages.map(lang => lang.name)
            }))
        };
        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Raw unformatted response for fetching languages by province ID
router.get('/raw/province/:id', async (req, res) => {
    try {
        const provinceId = parseInt(req.params.id);
        if (isNaN(provinceId)) {
            return res.status(400).json({ error: 'Invalid province ID' });
        }
        const province = await getLanguagesByProvinceId(provinceId);
        res.json(province);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Formatted response for fetching languages by province ID
router.get('/province/:id', async (req, res) => {
    try {
        const provinceId = parseInt(req.params.id);
        if (isNaN(provinceId)) {
            return res.status(400).json({ error: 'Invalid province ID' });
        }
        
        const province = await getLanguagesByProvinceId(provinceId);
        const formattedResponse = {
            provinces: [{
                name: province.name,
                history: province.history,
                languages: province.languages.map(lang => lang.name)
            }]
        };
        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;