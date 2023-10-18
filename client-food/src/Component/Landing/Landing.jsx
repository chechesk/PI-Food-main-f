import React from "react";
import { Link } from "react-router-dom";
import IMG from "../Tecnologies/Tec.jsx";
import "./Landing.css";


export default function Landing () {

    return (
       <div className='containerL'>
        <div className="landing">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        <h2 className="tittle">Aprendamos a Cocinar</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        <button className="button1"><Link to='/home' className="">Entrar</Link></button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
       <IMG className="cont-img" />
        </div>
    )}