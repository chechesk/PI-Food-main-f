import React from 'react';
import "./Filters.css";

const Filters = ({handleOrder, handleFilteredDiet, handleFilteredCreates, reset, diet}) => {
  return (
    <div className="containerF">
    <div className='filter-cnt'>
      <div className='select-order'>
        <select className='select-order--group' onChange={e => handleOrder(e)}>
            <option value="All">ORDEN</option>
            <option value="Asc">Ordenar de la A-Z</option>
            <option value="Des">Ordenar de la Z-A</option>
            <option value="Mejor">Mejor Ranking</option>
            <option value="Peor">Peor Ranking</option>
        </select>
      </div>
        <div className='filter-create'>
          <select className='select-order--group' onChange={e => handleFilteredCreates(e)}>
            <option value='todos'>Recipes</option>
            <option value='Creados'>Creados</option>
            <option value='API'>Existentes</option>
          </select>
        </div>

        <div>
                <select onChange={e => handleFilteredDiet(e)} className="">
                    <option value="Todos">All recipes</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian </option>
                    <option value="lacto-vegetarian">Lacto-Vegetarian </option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                </select>
                </div>
               <div>
                
                <select defaultValue='Filter by type' onChange={evt => handleFilteredDiet(evt)}>
                    <option disabled>Filter by type</option>
                            {diet?.map((type) => <option key={type.name} value={type.name}>{type.name}</option>)}
                </select>  
               </div>
                  

      <div  className='navbar-cnt_clear'>
        
            <button onClick={reset} className='navbar-cnt--button'>RECARGAR</button>
        
      </div> 
    </div>
    </div>
  )
}

export default Filters