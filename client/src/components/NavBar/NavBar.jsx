import React from 'react';
import {Link} from 'react-router-dom';
import s from './NavBar.module.css';
// import {useLocation} from 'react-router-dom'


export default function NavBar({match}){

    // let location = useLocation();

    return(
        <div className={s.navbar}>
            <div className={s.title}>     
                <h4>Wanderlust App  </h4>  
            </div>  
                    <span>  
                        <Link to= {'/home'} > 
                            <button className={s.btn}>
                                Home
                            </button>
                        </Link>
                    </span>
                    <div>
                    <span>
                        <Link to={'/activities'} >
                            <button className={s.btn}>
                                Create Activity 
                            </button>
                        </Link>
                    </span>
                </div>
        </div>
    )
}