const express = require('express');
const {getProvincesWithEthnicGroups, getEthnicGroupsByProvinceId } = require("../data-service/ethnicGroupDAL");

const router = express.Router();

router.get('/getAll', async (req, res) => {
    try {
        const ethnicGroups = await getProvincesWithEthnicGroups();
        res.json(ethnicGroups);
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
        
        const ethnicGroups = await getEthnicGroupsByProvinceId(provinceId);
        res.json(ethnicGroups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;