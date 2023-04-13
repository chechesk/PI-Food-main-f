import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {  searchRecipe } from '../../redux/Action'
import "../SearchBar/SearchBar.css"
//import {GET_API_NAME,} from '../../redux/actions'

import searchlogo from './ico/search.png'

const SearchBar = () => {
  
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };
  
    const handleButtonSubmit = (e) => {
        e.preventDefault();
        dispatch(searchRecipe(name));
        setName('');
    }



    return (
        <div>

            
        <form className='form-search-cnt'>
            <input 
                type="text" 
                placeholder='Buscar receta...'
                onChange={e => handleInputChange(e)}
                
            />
           
            <button 
                type='submit'
                onClick={e => handleButtonSubmit(e)}
            >
                <img src={searchlogo} alt="search icon" width={10} height={10} />
            </button>
        </form>
        </div>
    )
}

export default SearchBar