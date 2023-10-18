import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { getDetail } from '../../redux/Action';
import RecipeDetails from './RecipeDetail';
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const [id] = useState(props.match.params.id);
  const detail = useSelector((state) => state.detail);
  const diets = detail?.diets;
  

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className="">
      <NavBar />
      <div className="CardContainerD">
        <div className="tittle">
          <h2>{detail.name}</h2>
        </div>
        <img className="imgContainer" src={detail.image} alt="Photos"></img>
        <h3>Description</h3>
        <h3 >Summary</h3>
    {/* componente que convierte los parametros de pagina HTML para renderizarlo en el DOM */}
    <RecipeDetails detail={detail.summary} />   
        <div className="lineflex">
        </div>
        <h2>Types Diets</h2>
        <p>{detail.dietTypes || (diets && detail.diets.map((diet, index) => (
      <li className='li-s' key={index}>{diet.number} {diet.name}</li>
    )))}</p>
        <h2>Health Score: {detail.healthscore || detail?.healthScore || detail.healthScore }</h2>
          <h1>Preparacion:</h1> 
          <div className='steps'>

          <ul>
          {Array.isArray(detail.steps) ?
  detail.steps.map((step, index) => (
    <li className='li-s' key={index}>{step.number}. {step.step}</li>
    )) :
    detail.steps
    }
  </ul>
          </div>

        
      <Link to="/home">
        <button className="botback">Home</button>
      </Link>
      </div>
      <br></br>
    </div>
  );
}