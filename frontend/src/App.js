import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
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

function App() {
  const userState = useSelector((state) => state.user.value)

  return (
      <Router>
        <div className="App">
          <header>
            <Navbar/>
          </header>

          <Switch>
            <Route exact path="/">
              {userState === userStates.LOGGED_IN ? <Redirect to="/decks" /> : <Landing />}
            </Route>
            <Route exact path="/decks">
              <Decks />
            </Route>
            <Route exact path="/addDeck">
              <AddDeck/>
            </Route>
            <Route exact path="/cards">
              <Cards />
            </Route>
            <Route exact path="/addCard">
              <AddCard/>
            </Route>
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

      </Router>
  );
}

export default App;
