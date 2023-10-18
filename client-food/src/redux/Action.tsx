import axios from 'axios'
export const GET_ALL_DIET = 'GET_ALL_DIET';
export const  GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const  ERROR = 'ERROR';
export const DETAILS = 'DETAILS';
export const SEARCH_RECIPE = 'SEARCH_RECIPE';

//ordenamiento
export const NAME_BY_ORDEN = 'NAME_BY_ORDEN';
export const NAME_BY_HEALTSCORE = 'NAME_BY_HEALTSCORE';
export const ORDER_RECIPE = 'ORDER_RECIPE';
export const TYPE_BY_ORDER = 'TYPE_BY_ORDER';
//filtros
export const RECIPE_FILTERED_BY_CREATION = 'RECIPE_FILTERED_BY_CREATION';
export const RECIPE_FILTERED_BY_DIET = 'RECIPE_FILTER';

export const getRecipe = () =>{
    return async (dispatch) =>{
        try {
           const response = await fetch('http://localhost:3001/recipes')
           const recipes = await response.json()
           dispatch({
            type: GET_ALL_RECIPES,
            payload: recipes
           })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error,
            })
        }
        // con AXIOS
        // try {
        //     const response = await axios.get('http://localhost:3001/recipes')
        //     const recipes = response.data
        //     dispatch({
        //         type: GET_ALL_RECIPES,
        //         payload: recipes
        //     })
        // } catch (error) {
        //     dispatch({
        //         type: ERROR,
        //         payload: error,
        //     })
        // }
    }
}

export const getDiet = () =>{
    return async (dispatch) =>{
        try {
            const response = await fetch('http://localhost:3001/diet')
            const diet = await  response.json()
            dispatch({
                type: GET_ALL_DIET,
                payload: diet
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error,
            })
        }
        
        // CON AXIOS
        //try {
        //     const response = await axios.get('http://localhost:3001/diet')
        //     const diet = response.data
        //     dispatch({
        //         type: GET_ALL_DIET,
        //         payload: diet
        //     })
        // } catch (error) {
        //     dispatch({ type: ERROR, payload: error,})
        // }
    }
}
export function postRecipe(payload){
    return async function(dispatch){
        try {
            const response = await fetch("http://localhost:3001/recipe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
            const data = await response.json();
            return data;
          } catch (error) {
            dispatch({ type: ERROR, payload: error });
          }
    //    try {
    //        const response = await axios.post("http://localhost:3001/recipe", payload);
    //        //console.log(response);
    //        return response;
        
    //    } catch (error) {
    //     dispatch({type: ERROR, payload:error})
    //    }
    }
}

export function updateRecipe(payload, id){
    return async function(dispatch){
        const response = await axios.put(`http://localhost:3001/recipeupdate/${id}`, payload);
        //console.log(response);
        return response;
    }
}

export function deleteRecipe(id){
    return async function(dispatch){
        const response = await axios.delete(`http://localhost:3001/recipedelete/${id}`)
        console.log(response);
        return response;
    }
}

export const getDetail = (id) =>{
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:3001/recipes/${id}`);
            const recipe = await response.json();
            dispatch({
              type: DETAILS,
              payload: recipe
            });
          } catch (error) {
            dispatch({
              type: ERROR,
              payload: error
            });
          }
        
      
        // const RecipeDetail = await axios.get(`http://localhost:3001/recipes/${id}`)
        // return dispatch({
        //     type: DETAILS, 
        //     payload: RecipeDetail.data});
    }
}
export const searchRecipe = (name) => {
    return async (dispatch) => {
        // try {
        //     const response = await fetch(`http://localhost:3001/recipes?name=${name}`)
        //     const recipe = await response.json()
        //     dispatch({
        //         type: SEARCH_RECIPE,
        //         payload: recipe.data
        //     })
        // } catch (error) {
        //     dispatch({
        //         type: ERROR,
        //         payload: error,
        //     })
        // }
       try {
           const json = await axios.get(`http://localhost:3001/recipes/?name=`+name)
           return dispatch({
               type: SEARCH_RECIPE, 
               payload: json.data});
        
       } catch (error) {
        alert("Recipe not found");
      console.log(error);
       }
    }}

//ordenamiento 

export const orderRecipe = (payload) => {
    return {
        type: ORDER_RECIPE,
        payload
    }
  }

  export const nameByOrder = (payload)=>{
    return {
        type: NAME_BY_ORDEN,
        payload
    }
  }

  export const nameByHealtscor = (payload) =>{
    return {
        type: NAME_BY_HEALTSCORE,
        payload
    }
  }
  export const typeByOrder = (payload) =>{
    return {
        type: TYPE_BY_ORDER,
        payload
    }
  }
  //filtros
  export const RECIPEFILTEREDBYCREATION = (payload)=>{
    return {
        type: 
        RECIPE_FILTERED_BY_CREATION,
        payload
    }
  }
  export const RECIPEFILTEREDBYDIET = (payload)=>{
    return {
        type: 
        RECIPE_FILTERED_BY_DIET,
        payload
    }
  }
