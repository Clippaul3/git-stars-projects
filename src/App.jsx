import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios'
import Popular from "./pages/popular";
import Battle from "./pages/battle";
import Result from "./pages/result";
import {HashRouter as Router, Route, Redirect, Link, withRouter, Switch} from "react-router-dom";

class App extends Component {

    state = {}

    componentDidMount() {

    }


    render() {
        return (
            <div className="git-app">
                <Router>
                    <div className={'links'}>
                        <Link to={'/'} className={`navigate`}>Popular</Link>
                        <Link to={'/battle'} className={`navigate`}>Battle</Link>
                    </div>
                    {/*<Redirect to={'/popular'}/>*/}
                    <Switch>
                        <Route exact path={'/'} component={Popular}/>
                        <Route path={'/battle'} component={Battle}/>
                        <Route path={'/result'} component={Result}/>
                    </Switch>

                </Router>
            </div>
        )

    }
}

export default App;
