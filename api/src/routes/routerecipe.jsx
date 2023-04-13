const {Router} = require('express');
const {Recipe,Diet} = require('../db')
const {getAllRecipes, findRecipe,DbInfoName,getDbById,getApiById} = require('../Controller/recipes.jsx');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/',  async(req, res) => {
    const {name} = req.query
    let TotalRecipe = await getAllRecipes();
       if(name){
        let nameRecipe = await DbInfoName(name);
        nameRecipe.length ?
        res.status(200).send(nameRecipe):
        res.status(404).send('Not found Recipe')
    } else{
      res.status(200).send(TotalRecipe)
    }  
 
    
    });

    router.get('/:id', async (req, res, next) => {    
      const { id } = req.params  
      try {
          if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
              let dbRecipesById = await getDbById(id);            
              return res.status(200).json(dbRecipesById)
          } else { 
              apiRecipesById = await getApiById(id)
              if (apiRecipesById.data.id) {
                  let recipeDetails =  {                    
                      image: apiRecipesById.data.image,
                      name: apiRecipesById.data.title,
                      dishTypes: apiRecipesById.data.dishTypes,
                      dietTypes: apiRecipesById.data.diets,
                      summary: apiRecipesById.data.summary,
                      score: apiRecipesById.data.spoonacularScore,
                      healthScore: apiRecipesById.data.healthScore,
                      steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map(e => {
                          return {
                              number: e.number,
                              step: e.step
                          }
                      })
                  }
                  return res.status(200).send(recipeDetails); 
              }
          } 
      } catch {
          return res.status(404).send('Recipe not found')
      }
  });

  router.put('/:id', async(req,res)=>{
    const {id} = req.params;
    const {name, image, summary, healthscore, steps, diets, createdInDb} = req.body;
  try {
      const updatedRecipe = await Recipe.update({ name, image, summary, healthscore, steps, diets, createdInDb}, {where: {id: id}, returning: true});
    
        let recipeDb = await Diet.findAll({ where :{ name:diets} });
        await updatedRecipe.setDiets(recipeDb);

    res.status(200).json({messa: 'Updated Completed'})
    } catch (error) {
           res.status(404).json({error: error.message})
    }
    })
    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
          const recipe = await Recipe.findByPk(id);
          if (recipe) {
            await recipe.destroy();
            res.status(200).json({ message: 'Receta eliminada correctamente' });
          } else {
            res.status(404).json({ error: 'Receta no encontrada' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
      
  module.exports = router;
    