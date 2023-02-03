import {React, useEffect} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanCountryDetail, getCountryDetail } from "../../redux/actions/index.js";

import s from "./CountryDetail.module.css"
import logo from "../Images/logo.png"

export default function CountryDetail(props) {
    const dispatch = useDispatch()
    const {id }= useParams()
    const country = useSelector((state) => state.countryDetail)
    const history = useHistory()

    const allActivities = useSelector((state) => state.allActivities)

    const activities = [];
    allActivities.map(
        a => !activities.includes(a.name) && activities.push(a.name)
    );
    
    useEffect(() => {
        dispatch(getCountryDetail(id))
    },[dispatch, id])

    function handleClick(e){
        e.preventDefault();
        dispatch(cleanCountryDetail())
        history.push("/home")
        
    }

    function clean(){
        dispatch(cleanCountryDetail())
    }

    return (
        
        <div className={s.prindiv}>

            <div className={s.bar}>
            <Link to= "/home"><img className={s.bothome} onClick={(e) => handleClick(e)} src={logo} alt="logo"></img></Link>
            </div>

            <div className={s.cardd}>

                <div className={s.conpais} >
                <h2 className={s.titulod}>Details about:</h2>
            {
                country ?
                <div >
                    <img className={s.banderad} src={country.flag} alt="Not found" />
                    <h2 className={s.nombred}>{country.name}</h2>
                    <h4 className={s.continented}>{country.continents}</h4>
                    <h4 className={s.codigo}>{country.id}</h4>
                    <h4 className={s.detalle}>Capital: {country.capital}</h4>
                    <h4 className={s.detalle}>Region: {country.subregion}</h4>
                    <h4 className={s.detalle}>Area: {country.area} km²</h4>
                    <h4 className={s.detalle}>Population: {country.population} people </h4>
                </div> : <p>Loading ...</p>
            }
                </div>

            <div className={s.conact}>
            <h3 className={s.titulod}>Activities from {country.name}</h3>
            {
                country.activities&&country.activities.length ? 
            country.activities.map(e => {
                return (
                        <div>
                            <h4 className={s.nombreact}>Name: {e.name}</h4>
                            <p className={s.detalle}>Difficulty: {e.difficulty}</p>
                            <p className={s.detalle}>Duration: {e.duration} horas</p>
                            <p className={s.detalle}>Season: {e.season}</p>
                        </div>
                        
                    ) 
                 }) 
                 : <p>No activities yet</p> 
            }
             <Link to="/activities"><button className={s.botactd}>Create Activity</button></Link>               
            </div>
            </div>
        </div>
    )
};

