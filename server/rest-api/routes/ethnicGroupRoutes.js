const express = require('express');
const {getProvincesWithEthnicGroups, getEthnicGroupsByProvinceId } = require("../services/dal-service/data-service/EthnicGroupDAL");

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({
        status: "success",
    });
});

router.get('/getAll', async (req, res) => {
    try {
        const rawData = await getProvincesWithEthnicGroups();
        const formattedData = {
            provinces: rawData.map(province => ({
                name: province.name,
                history: province.history,
                ethnicGroups: province.ethnicGroups.map(group => group.name)
            }))
        };
        res.json(formattedData);
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
        
        const rawData = await getEthnicGroupsByProvinceId(provinceId);
        const formattedData = {
            provinces: [{
                name: rawData.name,
                history: rawData.history,
                ethnicGroups: rawData.ethnicGroups.map(group => group.name)
            }]
        };
        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;