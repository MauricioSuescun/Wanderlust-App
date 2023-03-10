import { useState } from 'react';
import { getCountries, getCountryByName } from '../../redux/actions/index.js';
import { useDispatch } from 'react-redux';
import styles from './SearchBar.module.css';


function validate(name){
    let errors = {};
    if(!name || isNaN(name) !== true){
     errors.name = 'Requires a country'                             
    }
    return errors;
};



export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
   
    
    
    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)                                                 //Seteo en name al input
        setErrors(validate(name))                                                                                                   
    };

    const handleSubmit = (e) =>{
    e.preventDefault()
    setErrors(validate(name))
    const errorSave= validate(name)
    if(Object.values(errorSave).length !== 0){
        alert('Please, required a Country')
    }else{
        dispatch(getCountryByName(name))} 
        setName('')                                                                         //Estado local=>accion
};

    function handleClick(e){ 
    dispatch(getCountries())
    setName('')
    };                                                        

    return (
        <div className={styles.searchContainer}>
            <input
                value={name}
                type='text'
                placeholder='Name: (ex: Argentina...)'
                onChange={(e) => handleInput(e)}/>
                {errors.name && (
                        <p id={styles.error}>{errors.name}</p>
                    )}
                    <ul className={styles.btns}>
                 <button  type='submit'onClick={(e) => handleSubmit(e)}>
                 SEARCH </button>
                 <button onClick={e => handleClick(e)}>                             
                  RECHARGE 
                 </button>
                 </ul>
        </div>
    )
};