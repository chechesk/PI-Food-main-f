
import React from "react";
import "./Card.css";

const Card = ({id, name, image, diets, dietTypes, background_image, healthscore, createInDb }) => {
   
    return ( 
        <div className="card" > 
         <h3>{name}</h3>
         <img className="cardImg" src={image} alt={`Imagen de ${name}`} />
         {/* <h2>Recipe</h2> */}
         {/* <img src={image || detail.background_image} alt={`Imagen de ${detail.name}`} title={`Imagen de ${detail.name} `} width='600px' />*/}
           <h3> Diet Type: </h3>
           <h5>{diets && diets.map( e => {
               // console.log(e)
                let response = "";
                if(e.name){
                    response = e.name + " | "
                } else if ( e) {
                    response = e + " | "
                                }
                return response;
            })}</h5>
                <h3 className="healthscore">Health Score: ⭐{healthscore}  </h3> 
      </div>
    )
}
export default Card;
