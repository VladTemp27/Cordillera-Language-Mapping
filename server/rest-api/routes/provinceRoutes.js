const express = require('express');
const { getAllProvinces, getProvinceById } = require("../services/dal-service/data-service/ProvinceDAL");
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

module.exports = router;