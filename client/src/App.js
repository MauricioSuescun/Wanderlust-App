import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Activity from "./components/Activity/Activity.jsx"
import LandingPage from "../src/components/LandingPage/LandingPage.jsx";
import './App.css';
import Home from "./components/Home/Home.jsx";
import CountryDetail from "./components/CountryDetails/CountryDetail.jsx";




function App() {
  return (    
    <div className="App">
      <Router>
        {/* <Route path= "/" render={()=> <NavBar/>}/> */}
        <Route exact path= "/" render={() => <LandingPage/>}/>
        <Route exact path= "/activities" render={() => <Activity/>}/>
        <Route exact path= "/home" render={() => <Home/>}/>
        <Route exact path = "/countries/:id" render={() => <CountryDetail/>} />
      </Router>  
    </div> 
  );
}

export default App;
