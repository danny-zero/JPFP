import React, { Component } from 'react'
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Students from './Students'
import Campuses from './Campuses'
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddCampusForm from './AddCampusForm';
import AddStudentForm from './AddStudentForm';

class Main extends Component {
    render() {
        // console.log(this.props)
        // console.log(window.location)
        return (
            <Router>
                <Nav />
                <Switch>
                    <Route exact path="/students" component={Students}/>
                    <Route exact path="/campuses" component={Campuses}/>
                    <Route path="/campuses/:campusId" component={SingleCampus} />
                    <Route path="/students/:studentId" component={SingleStudent} />
                    <Route path="/add-campus-form" component={AddCampusForm}></Route>
                    <Route path="/add-student-form" component={AddStudentForm}></Route>
                </Switch>
            </Router>
        )
    }
}

export default Main
