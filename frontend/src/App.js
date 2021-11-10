import './App.css';
import { Switch, Route, Redirect, useLocation, useHistory} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Landing from './components/Landing';
import Decks from './components/decks/Decks';
import { AddDeck } from './components/decks/AddDeck';
import Cards from './components/cards/Cards';
import { AddCard } from './components/cards/AddCard';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import React from 'react';
import { useSelector } from 'react-redux';
import { userStates } from './redux/user';
import decode from 'jwt-decode';
import {useEffect} from 'react';
import {logout} from './actions/userActions'
import { EditCard } from './components/cards/EditCard';
import { Play } from './components/decks/Play';
import { EditDeck } from './components/decks/EditDeck';


function App() {
  const location = useLocation();
  const history = useHistory();
  const userState = useSelector((state) => state.user)

  useEffect(() => {
    const token = userState?.value?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
        history.push('/login')
      };
    }
  }, [history, location, userState?.value?.token]);

  const createProtected = (path, Component, redirect) => {
    return (
      <Route exact path={path}>
        {userState.user === userStates.LOGGED_IN ? <Component/> : <Redirect to={redirect} />}
      </Route>
    )
  }

  
  return (
    
        <div className="App">
          <header>
            <Navbar/>
          </header>
          <Switch>
            <Route exact path="/">
              {userState.user === userStates.LOGGED_IN ? <Redirect to="/decks" /> : <Landing />}
            </Route>
            {createProtected("/decks", Decks, "/login")}
            {createProtected("/addDeck", AddDeck, "/login")}
            {createProtected("/cards", Cards, "/login")}
            {createProtected("/addCard", AddCard, "/login")}
            {createProtected("/cards/edit/:id", EditCard, "/login")}
            {createProtected("/decks/edit/:id", EditDeck, "/login")}
            {createProtected("/decks/play/:id", Play, "/login")}
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/signup">
              <SignUp/>
            </Route>
          </Switch>
          <footer>
          </footer>
        </div>

      
  );
}


export default App;
