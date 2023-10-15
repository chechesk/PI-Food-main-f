const axios = require('axios');
const db = require("../db");
const { Diet, Recipe, API_KEY } = require("../db");

// Controller functions: 
const getApiInfo = async () => {
    const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    
    const apiInfo = await apiUrl.data.results.map(e => {
        //console.log(e);
        return {
            id: e.id,
            image: e.image,
            name: e.title,
            diets: e.diets,
            summary: e.summary,
            score: e.spoonacularScore,
            healthscore: e.healthScore,
            dishTypes: e.dishTypes,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    })
    
    return apiInfo;
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    
    return totalInfo;
}
const getApiById = async (id) => {
    
    return await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
}


const getDbById = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const findRecipe = async () => {
    const recipeAll = await Recipe.findAll({

        include: [
            {
                model: Diet,
                attributes: ['name'],
            }
        ]
    }
    );
    return recipeAll

}

const getApiName = async (name) => {
    try {
        const apiName = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&apiKey=${API_KEY}`)
        const ApiName = apiName.data.results
        
        if (ApiName.length > 0) {
            let response = ApiName?.map((e)=> {
                return {
                    id: e.id,
                    image: e.image,
                    name: e.title,
                    diets: e.diets,
                    summary: e.summary,
                    score: e.spoonacularScore,
                    healthscore: e.healthScore,
                    dishTypes: e.dishTypes,
                    steps: e.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    }) }
            })
            return response
        } else {
            return []
        }
    } catch (error) {
        console.log(error);
        return []
    }
}

const getDbName = async (name) => {      
    const DbInfo = await getDbInfo()

    if (!Array.isArray(DbInfo)) {
        throw new Error('getDbInfo debe devolver un arreglo');
    }

    const filtByName = DbInfo.filter(recipe => {
        return recipe && recipe.name && recipe.name.includes(name);
    });
            
    return filtByName;
}

const DbInfoName = async(name) => {      
    const ApiByName = await getApiName(name)
    const DbByName = await getDbName(name)

    let TotalName = []
    if(ApiByName !== undefined){
        TotalName = TotalName.concat(ApiByName)
    }
    if(DbByName !== undefined){
        TotalName = TotalName.concat(DbByName)
    }
    return TotalName
}
   
    

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getDbById,
    getApiById,
    findRecipe,
    DbInfoName
}