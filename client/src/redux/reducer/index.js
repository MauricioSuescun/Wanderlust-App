const initialState = {
    countries : [],
    allCountries: [],
    allActivities: [],
    activities: [],
    countryDetail: [],
    selectedCountries: [],
    continent: "All",
    activity: "All",

}


const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_COUNTRIES" :
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,

            };

        case "GET_COUNTRY_DETAIL":
            return {
                ...state,
                countryDetail: action.payload,

            };
            
        case "GET_COUNTRIES_BY_NAME":
            return {
                ...state,
                countries: action.payload,
            };
            
        case "FILTER_BY_CONTINENT":
            const allContinents = state.allCountries
            const filteredContinent = action.payload === "All" ? allContinents : allContinents.filter(e => e.continent === action.payload)
            return {
                ...state,
                countries: filteredContinent
            };   
          
        case "ORDER_BY_NAME": {
            let sortedCountries = [];
            if (action.payload === 'A-Z') {
                sortedCountries = [...state.allCountries].sort((a, b) => a.name.localeCompare(b.name))
                }
            if (action.payload === 'Z-A') {
                sortedCountries = [...state.allCountries].sort((a, b) => b.name.localeCompare(a.name));
                }
            return {
                ...state,
                countries: sortedCountries,
                // showLoading: false,
                }
            };      
        case "ORDER_BY_POPULATION": {
            let sortedCountries = [];
            if (action.payload === 'ASC') {
                sortedCountries = [...state.allCountries].sort((a, b) => a.population - b.population)
            }
            if (action.payload === 'DESC') {
                sortedCountries = [...state.allCountries].sort((a, b) => b.population - a.population);
            }
            return {
                ...state,
                countries: sortedCountries,
                // showLoading: false,
            }
         };
        // case 'GET_NAME':
        //     return{
        //         ...state,
        //         stateCountry: action.payload                                                //Siempre trabajo con el que renderizo.
        //     };
        case "GET_COUNTRY_BY_ID" :
            return {
                ...state,
                country: action.payload
            };
        case 'FILTER_BY_ACTIVITIES':
                let countriesActivities = document.getElementById("firstSelect").value === 'All' 
                ? state.allCountries
                : state.byContinentCountries
                let activityFilter = action.payload === 'All'
                ? countriesActivities
                : countriesActivities.filter(country=> country.activities && country.activities.map(a => a.name).includes(action.payload))
                return{
                    ...state,
                    countries: activityFilter,
                }; 
        case 'GET_ACTIVITIES':
                    return{
                        ...state,
                        stateActivities: action.payload
                    }
        case 'POST_ACTIVITY':
                    return{
                        ...state,
                        allActivities: state.allActivities.concat(action.payload)
                     } ;
        case "SET_PAGE":
                    return {
                            ...state,
                            currentPage: action.payload,
                            showLoading: false,
                        };
        
        case "RESET_COUNTRIES": {
                return {
                        ...state,
                        allCountries: state.allCountries.sort((a, b) => a.name.localeCompare(b.name)),
                        
                            }
                        };
        case 'FILTER_ACTIVITY': {

                const filteredByContinent = state.continent === 'All' ?
                    countriesActivities :
                    countriesActivities.filter(c => c.continent === state.continent);
    
                const filteredCountries = action.payload === 'All' && filteredByContinent.length ?
                    filteredByContinent :
                    filteredByContinent.filter((c) => c.activities.map((ac) => ac.name).includes(action.payload));
                return {
                    ...state,
                    allCountries: filteredCountries,
                    activity: action.payload,
                    showLoading: false,
                }
            }
        case 'CLEAN_COUNTRIES':
            return{
                ...state,
                countries: []
        }
        case 'SET_DETAIL':
            return{
                ...state,
                stateDetail: {}
            } 
        case 'CLEAN_COUNTRY_DETAIL':
                return{
                    ...state,
                    countryDetail: {}
                }
        case 'SEARCH':
            return {...state, countries:action.payload};                    
        default:
            return {...state};
    }
};



export default rootReducer;