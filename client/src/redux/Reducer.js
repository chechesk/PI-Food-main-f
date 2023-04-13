import {
    GET_ALL_DIET,
    GET_ALL_RECIPES,
    ERROR,
    DETAILS,
    SEARCH_RECIPE,
    ORDER_RECIPE,
    RECIPE_FILTERED_BY_CREATION,
    RECIPE_FILTERED_BY_DIET,
    postRecipe
} from './Action'



const initialState = {
    Allrecipes:[],
    recipes: [],
    diet: [],
    detail: [],
    ERROR: {}
}

export default function rootReducer(state=initialState, action){
    
    switch(action.type) {
        case postRecipe:
            return {
                ...state,
                }
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                Allrecipes: action.payload
            }
            case GET_ALL_DIET:
                return{
                    ...state,
                    diet: action.payload,
                }
             case ERROR:
            return{
                ...state,
                ERROR: action.payload
            }
            case DETAILS:
            return{
                ...state,
                detail: action.payload
            }
            case SEARCH_RECIPE:
                return {
                  ...state,
                  recipes: action.payload,
                };
                // filtros
            case RECIPE_FILTERED_BY_CREATION:
                const allReciFil = state.recipes;
                let filterCreated;
                if (action.payload  === 'Creados') {
                   filterCreated = allReciFil.filter(e=> e.createdInDb)
                    }else if (action.patload === 'API') {
                        filterCreated = allReciFil.filter(g => !g.createdInDb)
                    } else {
                        filterCreated = allReciFil;
                    }return {
                        ...state,
                        recipes: filterCreated
                    }
                    
            case RECIPE_FILTERED_BY_DIET:
                let allRecipe = [];
                if (action.payload) {
                    allRecipe = state.recipes.filter(recipes => {
                        if (recipes.diets.length === 0) {
                            return recipes.diets
                        }
                        else if (recipes.diets.some(d => d.name === action.payload)){
                            return recipes.diets.map(d => d.name)
                        }
                        else {
                            return recipes.diets.includes(action.payload)
                        }
                    })
                }    else {
                    allRecipe = state.recipes
                }
                return{
                    ...state,
                    recipes: action.payload === 'Todos' ? state.Allrecipes : allRecipe
                }
                    case ORDER_RECIPE:
                        let allrecipeOrder = [...state.recipes]
                        let allOrder;
                        switch (action.payload) {
                            case 'All':
                                allOrder = [...state.recipes]
                                break;
                                case 'Asc':
                                    allOrder = allrecipeOrder.sort((a,b) => {
                                        if (a.name.toLowerCase()> b.name.toLowerCase()) {
                                            return 1;
                                        }
                                        if (a.name.toLowerCase()< b.name.toLowerCase()) {
                                            return -1;
                                        }
                                        return 0
                                    })
                    break;
                    case 'Des':
                        allOrder = allrecipeOrder.sort((a,b)=> {
                            if (a.name.toLowerCase()< b.name.toLowerCase()) {
                                return 1;
                            }
                            if (a.name.toLowerCase()> b.name.toLowerCase()) {
                                return -1;
                            }
                            return 0;
                        })
                        break;
                        case 'Peor':
                            allOrder = allrecipeOrder.sort((a,b)=>{
                                return a.healthscore - b.healthscore
                            })
                            break;
                            case 'Mejor':
                                allOrder = allrecipeOrder.sort((a,b)=>{
                                    return b.healthscore - a.healthscore
                                })    
                                break;
                                default:
                                    allOrder = allrecipeOrder
                                    break;
                                }
                                
                                return {
                                    ...state,
                                    recipes: allOrder,
                                    Allrecipes: allOrder
                                }
                                
                                //set Defaul por si hay error
                                
                                default:
                                    return {
                                        ...state,
                                        ERROR: action.payload
                                    }
                                    
                                    
                                    
                                }}