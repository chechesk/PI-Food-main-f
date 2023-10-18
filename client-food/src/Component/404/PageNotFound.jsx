import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";



export default function Page404 () {

    return ( 
        <div class="warning">
        <div>

          <h1>404 - Página no encontrada</h1>
        <h1>Lo siento, la página que estás buscando no existe.</h1>
          </div>
<div>
        <Link to="/home"><button className="botback">Home</button></Link>
</div>
  

      </div>
    )}