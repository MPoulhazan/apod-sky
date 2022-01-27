import React, { Component } from 'react';
import './App.scss';
import Home from './pages/Home/Home';
import { Switch, Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Config from './pages/Config/Config';
import { CONFIG_PATH, HOME_PATH } from './shared/models/Constants';

const history = createBrowserHistory();
class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route exact path={HOME_PATH} component={Home} />
                        <Route exact path={CONFIG_PATH} component={Config} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
