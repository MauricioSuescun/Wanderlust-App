import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities, orderByName, filterByContinent, filterByActivities, cleanCountries } from '../../redux/actions/index.js';
// import { Link } from "react-router-dom";
import Paging from "../Paging/Paging";
// import FilterBar from "../FilterBar/FilterBar";
// import SearchBar from "../SearchBar/SearchBar";
// import Card from "../Card/Card";
// import Cards from "../Cards/Cards.jsx";
import CountriesCard from "../CountriesCard/CountriesCard.jsx";
import s from "./Home.module.css"
import Header from "../Header/Header.jsx";
import Search from "../Search/Search.jsx";
import NavBar from "../NavBar/NavBar.jsx";


export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)
    // const allActivities = useSelector((state) => state.activities)
    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const lastCountry = currentPage * countriesPerPage
    const firstCountry = lastCountry - countriesPerPage
    const currentCountries = allCountries.slice(firstCountry, lastCountry)
    const [name, setName] = useState("");
    const [resetChange, setResetChange] = useState('');




    const paging = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }
    function handlePrev(e){
        e.preventDefault();
        setCurrentPage(prev => prev -1);
    }

    function handleNext(e){
        e.preventDefault();
        setCurrentPage(prev => prev +1);
    }

    useEffect(()=> {
        // setSecond(true)
        setIsLoading(true);
        dispatch(getCountries(setIsLoading));
        dispatch(getActivities());
        return ()=> dispatch(cleanCountries())
    }, [dispatch]);


const changeOrder = (event) => {
    event.preventDefault()
    setOrder(event.target.value)
}

function handleSort(event){
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`)
}

function handleFilterContinent(event){
    event.preventDefault();
    dispatch(filterByContinent(event.target.value));
    setCurrentPage(1);
}

function handleFilterActivity(event){
    dispatch(filterByActivities(event.target.value))
    console.log(event.target.value)
}




function handleClickContinent(e){
    e.preventDefault()
    setName('');
    let saveActivity = document.getElementById("secondSelect").value;
    let filter = document.getElementById("thirdSelect").value;
    dispatch(filterByContinent(e.target.value));
    dispatch(filterByActivities(saveActivity));
    dispatch(orderByName(filter));
    if(currentCountries) setCurrentPage(1);
}

function handleClickActivity(e){
    e.preventDefault();
    setName('');
    let filter2 = document.getElementById("thirdSelect").value;
    dispatch(filterByActivities(e.target.value));
    dispatch(orderByName(filter2));
    if(currentCountries) setCurrentPage(1);
}

function handleClickFilter(e) {
    e.preventDefault();
    setOrder(e.target.value); //solo para setear estado y renderizar
}

function handleClickReset(e){
    e.preventDefault();
    dispatch(getCountries(setIsLoading));
    setName('');
    document.getElementById("firstSelect").getElementsByTagName('option')[0].selected = 'selected';
    document.getElementById("secondSelect").getElementsByTagName('option')[0].selected = 'selected';
    document.getElementById("thirdSelect").getElementsByTagName('option')[0].selected = 'selected';
    setCurrentPage(1);
    setResetChange(resetChange = resetChange === 0 ? resetChange = 1 : resetChange = 0);
}

return(
    <div className={s.all}>
    <div className={s.container}>     
        <div className={s.horizontal}>
                <NavBar/>
            <div className={s.bar}>
                <Search/>
                <br></br>
                <Header />
            </div>
            <div className={s.cards}>
                {                         
                    currentCountries.length > 0 ?
                    currentCountries.map(c => {
                        return (
                            <CountriesCard key={c.id} id={c.id} name={c.name} flag={c.flag} continents={c.continents} capital={c.capital} />
                        )
                    }) :
                    <div id={s.noCountries}>
                        <p>
                        No countries were found with these parameters.
                        </p>
                        <p>
                        Try a new search ...
                        </p>
                    </div>
                   

                }
            </div>
        </div>

        {/* { isLoading ? <img src="../images/loading.gif" alt='Cargando...'/> :
            <ul className={s.countriesGrid}>
            {  currentCountries?.map(country => (
                <Link to={'/home/' + country.id}>
                <CountriesCard 
                name={country.name} 
                flags={country.flags} 
                continent={country.continent}
                id={country.id}
                population={country.population}
                key={country.id}/>
                </Link>
            ))}
            </ul>
            } */}

        <Paging     countriesPerPage={countriesPerPage}
                        allCountries={allCountries.length}
                        paging={paging}
                        currentPage={currentPage}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
        />
    </div>
    </div>
)

}