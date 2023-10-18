import React from 'react';
import "./Detail.css";

export default function RecipeDetails({ detail }) {
  return (
    <div className='contsummary'>
      <h5 dangerouslySetInnerHTML={{ __html: detail }}></h5>
    </div>
  );
}