import React from "react"
import "./Tec.css";
import react from "./img/react.png";
import redux from "./img/redux.png";
import node from "./img/nodejs.png";
import express from "./img/express.png";


export default function IMG () {
    return(
        <>
        <div className="footer">

        <div className="img-c">
            <img src={node} className="node" alt="logo" />
            <img src={express} className="express" alt="logo" width={20} />
            <img src={react} className="react" alt="logo" />
            <img src={redux} className="redux" alt="logo" />
        </div>


        </div>
        </>
    )
}