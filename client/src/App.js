import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import  Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {sujet} from './sujet/sujet';
import {home} from './home';
import {LoginForm} from './components/login';
import {signup} from './components/signup';
import {Jsx} from './components/jsx';
import {ajout} from './components/ajout';
import {affichsujet} from './components/affichsujet';
import {account} from'./components/account';
import {settings} from './components/settings';
import {about} from './components/about';
import {contact} from './components/contact';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Router>
            <AppNavbar />
            <Switch>
              <Route exact path="/" component={home}/>
              <Route  path="/sujet" component={sujet}/>
              <Route  path="/login" component={LoginForm}/>
              <Route path="/signup" component={signup}/>
              <Route path="/jsx" component={Jsx}/>
              <Route path="/ajout-sujet" component={ajout}/>
              <Route path="/affich-sujet/:id" component={affichsujet}/>
              <Route path="/account/:id" component={account}/>
              <Route path="/settings" component={settings}/>
              <Route path="/about" component={about}/>
              <Route path="/contact" component={contact}/>
            </Switch>
            <Footer/>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
