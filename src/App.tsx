import React, { Component } from 'react';
import './App.scss';
import Home from './pages/Home';
import { Switch, Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <span className="title">APOD SKY</span>
                </header>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
