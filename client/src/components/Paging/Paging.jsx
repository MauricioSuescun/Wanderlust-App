import React from 'react'
import s from './Paging.module.css'
import logo from "../Images/logo.png"
import logoinv from "../Images/logoinv.png"

export default function Paging({countriesPerPage, allCountries, paginado, currentPage, handleNext, handlePrev}){

    const pageNumbers = []

    for(let i = 1; i<= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <div className={s.bar}>
            <ul> 
                <button className={s.prev} onClick={e=>handlePrev(e)} disabled={currentPage - 1 === 0 ? true : false}><img src={logo} alt="Prev"/></button>
                { pageNumbers &&
                    pageNumbers.map(number =>(
                        <li key={number}>
                            <button id={s.number} className={currentPage === number ? s.active : null} onClick={()=> paginado(number)}> {number} </button>
                        </li>
                    ))
                }
                <button className={s.next} onClick={e=> handleNext(e)} disabled={currentPage >= pageNumbers.length ? true : false}><img src={logoinv} alt="Next"/></button>
            </ul>
        </div>
    )
}