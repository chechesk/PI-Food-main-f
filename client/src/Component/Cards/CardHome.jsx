import React from "react";
import { useState, useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { RECIPEFILTEREDBYCREATION, RECIPEFILTEREDBYDIET, getDiet, getRecipe,orderRecipe } from "../../redux/Action";
import {Link} from "react-router-dom"
import Card from "../Card/Card";
import Paginado from "../Paginate/Paginate"
import Filters from "../Filter/Filters";
import "./CardHome.css"
import Loader from "../Loader/Loader";

export default function Cards ({id, name, image, diets}) {
    const dispatch = useDispatch();
    const recipes = useSelector((state)=> state.recipes)
    const diet = useSelector((state)=> state.diet)
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(getRecipe());
                await  dispatch(getDiet())
                setLoading(false);
            } catch (error) {
                setLoading(false);
                
            }
        }
        fetchData();
    },[dispatch]);

    // Paginado

    const [currentPage, setCurrentPage] = useState(1);
    const [recetePerPage] = useState(8);
    const last = currentPage * recetePerPage;
    const first = last - recetePerPage;
    const currentRecipes = Array.isArray(recipes) ? recipes.slice(first, last) : [];
    const pageCount = Math.ceil(recipes.length / recetePerPage);
    const [maxPageLimit, setmaxPageLimit] = useState(4); // cantidad máxima de números de página a mostrar + la reciente
    const [minPageLimit, setminPageLimit] = useState(0);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (pageNumber > maxPageLimit) {
            setmaxPageLimit(maxPageLimit + 5);
            setminPageLimit(minPageLimit + 5);
        }
        if (pageNumber <= minPageLimit) {
            setmaxPageLimit(maxPageLimit - 5);
            setminPageLimit(minPageLimit - 5);
        }
    };

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            if ((currentPage - 1) % 5 === 0) {
                setmaxPageLimit(maxPageLimit - 5);
                setminPageLimit(minPageLimit - 5);
            }
        }
    };
      
    const nextPage = () => {
        if (currentPage !== pageCount) {
            setCurrentPage(currentPage + 1);
            if (currentPage + 1 > maxPageLimit) {
                setmaxPageLimit(maxPageLimit + 5);
                setminPageLimit(minPageLimit + 5);
            }
        }
    };

    const reset = (e) => {
        e.preventDefault()
        dispatch(getRecipe())
        setCurrentPage(1)
        setmaxPageLimit(4); // setea el numero maximo de paginas a mostrar en el paginado + la reciente
        setminPageLimit(0);
    }
//filter

const handleOrder =(e) =>{
  e.preventDefault();
  if (e.target.value === '') {
    dispatch(getRecipe())
    dispatch(getDiet())
  }else{
    dispatch(orderRecipe(e.target.value))
    setCurrentPage(1);
  }
}

// Handler
const handleFilteredCreates = (e)=> {
    dispatch(RECIPEFILTEREDBYCREATION(e.target.value))
    setCurrentPage(1);
}
const handleFilteredDiet = (e) => {
    dispatch(RECIPEFILTEREDBYDIET(e.target.value))
    setCurrentPage(1);
}

return ( 
    
        <div>
          {loading ? (
            <div className="loader-container">
    
            <Loader className="loader"/>
            </div>
          ) : (
    <div className="container">


    <div className="Container-global">
    <Filters
    handleOrder={handleOrder}
    handleFilteredCreates={handleFilteredCreates}
    handleFilteredDiet={handleFilteredDiet}
    diet={diet}
    reset={reset}
    
    />

<div className="CardsContainer">
    {currentRecipes?.map((recipe)=>{
        //console.log(currentRecipes);
        return(
            
            
            <div className="" key={recipe.id} >
            <Link to={"/home/"+recipe.id }>
                <Card className="card"
                                    id = {recipe.id} 
                                    key = {recipe.id}
                                    name = {recipe.name}
                                    image = {recipe.image}
                                    dietTypes = {recipe.dietTypes}
                                    diets = {recipe.diets}
                                    healthscore = {recipe.healthscore}
                                    healthScore = {recipe.healthScore}
                                    createInDb = {recipe.createInDb}
                                    />
                      
            </Link>
        </div>
    )
    })}
       </div>
       
        </div>
        <div>
       <Paginado
                paginado={paginado}
                pageCount={Math.ceil(pageCount / recetePerPage )}
                recetePerPage={recetePerPage}
                recipes={recipes.length}
                currentPage={currentPage}
                previousPage={previousPage} // Propiedad anterior
                nextPage={nextPage} // Propiedad siguiente
                minPageLimit={minPageLimit}
                maxPageLimit={maxPageLimit}
                
                /> 
               
                
            </div>
        </div>
    )}
    
    </div>
  );
}