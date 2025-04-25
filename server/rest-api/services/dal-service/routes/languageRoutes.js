const express = require('express');
const {getProvincesWithLanguages, getLanguagesByProvinceId } = require("../data-service/LanguageDAL");

const router = express.Router();

router.get('/getAll', async (req, res) => {
    try {
        const languages = await getProvincesWithLanguages();
        res.json(languages);
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
        
        const languages = await getLanguagesByProvinceId(provinceId);
        res.json(languages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;