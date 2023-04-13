import React from "react";
import SearchBar from "../SearchBar/SearchBar";

import "./NavBar.css";

const brand = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRmsmOjfNHyb3fzX5UXdOL0HTq0QoF9XqWWA&usqp=CAU"

export default function NavBar () {
    return(
        <>
           <header className="header">
    {/* logo de la marca */}
    <div className="logo-container">
      <img src={brand} className="logo" alt="logo" />
    </div>
      <h4>PI-FOOD BY Jose Romero</h4>
    <SearchBar className='navSearchBar'/>
    <div className="Cbar">
      <div>
      </div>

        <nav>
           <ul className="ulnav"> 
              <li className="li"><a href="/">Inicio</a></li>
              <li className="li"><a href="/home">Recetas</a></li>
              {/* <li><a href="/About">Quienes Somos</a></li> */}
              <li className="li"><a href="/create">Create Receta</a></li>
          </ul>
    </nav>
    
    </div>
    </header>
        </>
    )
}