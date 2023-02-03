import axios from 'axios';


export function getCountries(){
    return async function(dispatch){
        try{
            const result = await axios.get("http://localhost:3001/countries")
            return dispatch(
            {type: 'GET_COUNTRIES',
            payload: result.data})
        }
        catch(error){
            console.log(error)

        }
    }
}




export function getCountryByName(name){
    return async function(dispatch){
        try{
            const json = await axios.get('http://localhost:3001/countries?name=' + name)
            return dispatch({
            type: 'GET_COUNTRIES_BY_NAME',
            payload: json.data
            })
        }
        catch(error){
          console.log(error)
    
}}};

// export function orderByName(payload){
//         return ({
//             type: 'ORDER_BY_NAME',
//             payload
//         })
// };

export function getCountryDetail(id){
        return async function (dispatch){
            try {
                const countryDetail = await axios.get('http://localhost:3001/countries/' + id)
                return dispatch({
                    type: 'GET_COUNTRY_DETAIL',
                    payload: countryDetail.data
                })
            }
            catch(error){console.log(error)}
        }
};

export function getCountryById(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/countries/${id}`)
            return dispatch({
                type: "GET_COUNTRY_BY_ID",
                payload: json.data
            })
        } catch (error) {
            console.log('Error action getCountryById ' + error)
        };
    };
};
    
export function filterByContinent(payload){                                           //payload=>component
    //console.log(payload)
        return ({
            type: 'FILTER_BY_CONTINENT',
            payload
        })
};

export function orderByPopulation(payload){
        return({
            type:'ORDER_BY_POPULATION',
            payload
        })
};

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
};

// export function postActivity(payload){
//     return async function(dispatch){
//         const activity = axios.post('http://localhost:3001/activities', payload)
//         // console.log(activity)
//         return activity
//     }
// };

export function postActivity(data) {
    return async function (dispatch) {
        return axios.post('http://localhost:3001/activities', data)
            .then(response => response.data)
            .then(response => {
                dispatch({ type: 'POST_ACTIVITY', payload: response });
                alert('Se creo la actividad. ')
                return true
            })
            .catch(error => {
                console.log(error);
                alert('No se puede crear la actividad. Error: ' + error.response.data)
                return false
            })
    }
};

export function getActivities(){
    return async function(dispatch){
       const getActivity = await axios.get('http://localhost:3001/activities')
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: getActivity.data
        })
    }
};

// export function filterAct(payload){
//         return{
//             type: 'FILTER_ACTIVITY',
//             payload
//         }
// };
// export function getDeleteActivities(){
//     return async function(dispatch){
//        const getDAct = await axios.get('http://localhost:3001/delete')
//         return dispatch({
//             type: 'GET_DELETE',
//             payload: getDAct.data
//         })
//     }
// };

export function filterByActivities(payload){
    return{
        type: 'FILTER_BY_ACTIVITIES',
        payload
    }
}

export function setStateDetail(){
    return {
        type: 'SET_DETAIL'
    }
};


export function setCurrentPage(page) {
    return { type: 'SET_PAGE', payload: page }
};

export function filterByActivity(payload) {
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
};

export function resetCountries() {
    return function (dispatch) {
        try {
            dispatch({ type: 'RESET_COUNTRIES' })
        } catch (error) {
            console.log(error)
        }
    };
};


export function cleanCountries(){
    return{
        type: 'CLEAN_COUNTRIES'
    }
}

export function cleanCountryDetail(){
    return{
        type: 'CLEAN_COUNTRY_DETAIL'
    }
}

export const searching = (name) => {
    return function(dispatch){
    try{
        axios.get(`http://localhost:3001/countries?name=${name}`)
        .then((data) => data.data)
        .then((data) => dispatch({type: "SEARCH", payload: data}))
        
    }
    catch(error){
        console.log(error.message)
    }}
};