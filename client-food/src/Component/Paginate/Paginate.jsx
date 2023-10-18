import React from "react";
import { useState } from "react";
//import s from "../Paginate/paginado.module.css";
import "./paginate.css";


export default function Paginado({
  recetePerPage,
  recipes,
  paginado,
  previousPage,
  nextPage,
  maxPageLimit,
  minPageLimit,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recipes / recetePerPage); i++) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(currentPage);

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setActivePage(pageNumber);
    paginado(pageNumber);
  };

  let pageIncrementButton = null;
  let pageDecrementButton = null;

  if (pageNumbers.length > maxPageLimit) {
    pageIncrementButton = (
      <li onClick={nextPage} className="pageNumber">
        &hellip;
      </li>
    );
  }

  if (minPageLimit >= 1) {
    pageDecrementButton = (
      <li onClick={previousPage} className="pageNumber">
        &hellip;
      </li>
    );
  }

  const visiblePageNumbers = pageNumbers.slice(
    minPageLimit,
    maxPageLimit + 1
  );

  return (
    <nav className="paginadoContainer">
      <ul className="ul-paginadoContainer">
        <li
          onClick={previousPage}
          className="pageNumber"
          disabled={currentPage === 1}
        >
          <p className="p">Prev</p>
        </li>

        {pageDecrementButton}

        {visiblePageNumbers.map((number) => (
  <li
    key={number}
    className={number === activePage ? "pageActive pageHover" : "pageActive"}
  >
    <button
      className="numeroPaginado"
      href="#"
      onClick={(e) => handleClick(e, number)}
    >
      {number}
    </button>
  </li>
))}

        {pageIncrementButton}

        <li
          onClick={nextPage}
          className="pageNumber"
          disabled={currentPage === pageNumbers.length}
        >
         <p className="p">Next</p> 
        </li>
      </ul>
    </nav>
  );
}