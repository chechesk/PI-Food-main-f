const {Router} = require('express');
const {Recipe,Diet} = require('../db')

const router = Router();

router.post('/', async (req, res) => {
    let {
        name,
        image,
        summary,
        healthscore,
        steps,
        createdInDb,
        diets,
    } = req.body;

    try{
        let recipeCreate = await Recipe.create({ 
            name,
            image,
            summary,
            healthscore,
            steps,
            createdInDb,
        })

        let dietDB = await Diet.findAll({ 
            where: {name: diets}
        })

        if (!name) return res.status(400).send({error: 'Debe ingresar el name para la receta'});
        if (!summary) return res.status(400).send({error: 'Debe ingresar un summary del receta'});
        // console.log(recipeCreate);
        // console.log(dietDB);
        
        recipeCreate.addDiet(dietDB);
        res.status(200).send('Succesfull');

    }catch(error){
        res.status(400).send(error);
    }
})



module.exports = router;