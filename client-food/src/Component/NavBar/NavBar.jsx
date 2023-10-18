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
    <div className="autor">
      <h1>PI-FOOD BY </h1>
      <h1>JOSE G ROMERO M</h1>
    </div>
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