const { Router } = require('express');
const { dietTypesDb } = require('../Controller/diet.jsx')
const { Recipe, Diet } = require('../db');
const recipe = require('./recipe.jsx')
const db = require("../db");

const router = Router();

router.get('/', async (req, res, next) => {
    
    try {
        dietTypesDb.forEach(e => {
            Diet.findOrCreate({
                where: { name: e}
            })
        });
        const dietTypes = await Diet.findAll();
        res.send(dietTypes)
    } catch (error) {
        next(error)
    }
})



module.exports = router;
