import React, { Component } from 'react';
import './App.scss';
import Home from './pages/Home/Home';
import { Switch, Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Config from './pages/Config/Config';

const history = createBrowserHistory();
class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/config" component={Config} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
