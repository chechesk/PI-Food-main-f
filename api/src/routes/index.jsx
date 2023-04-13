const {Router} = require('express');
const Recipe = require('./routerecipe.jsx');
const Diet = require('./routerdiet.jsx')
const RecipePost = require('./recipe.jsx')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', Recipe);
router.use('/diet', Diet);
router.use('/recipe', RecipePost);


module.exports = router;
