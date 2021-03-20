import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Students from './Students'
import Campuses from './Campuses'
import SingleCampus from './SingleCampus';

class Main extends Component {
    render() {
        return (
            <Router>
                <Nav />
                <Switch>
                    <Route exact path="/students" component={Students}/>
                    <Route exact path="/campuses" component={Campuses}/>
                    <Route path="/campuses/:campusId" component={SingleCampus} />
                </Switch>
            </Router>
        )
    }
}

export default Main
