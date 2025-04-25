const express = require('express');
const { getAllProvinces , getProvinceById } = require("../data-service/ProvinceDAL");

const router = express.Router();

router.get('/getAll', async (req, res) => {
    try {
        const provinces = await getAllProvinces();
        res.json(provinces);
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
        
        const provinces = await getProvinceById(provinceId);
        res.json(provinces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;