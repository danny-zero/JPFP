import React, { Component } from 'react'
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Students from './Students'
import Campuses from './Campuses'
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddCampusForm from './AddCampusForm';
import AddStudentForm from './AddStudentForm';
import EditStudentForm from './EditStudentForm';
import EditCampusForm from './EditCampusForm';

class Main extends Component {
    render() {
        return (
            <Router>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/students" component={Students}/>
                    <Route exact path="/campuses" component={Campuses}/>
                    <Route path="/campuses/single-campus/:campusId" component={SingleCampus} />
                    <Route path="/students/:studentId" component={SingleStudent} />
                    <Route path="/add-campus-form" component={AddCampusForm}></Route>
                    <Route path="/add-student-form" component={AddStudentForm}></Route>
                    <Route path="/edit/campus/:campusId" component={EditCampusForm}></Route>
                    <Route path="/edit/student/:studentId" component={EditStudentForm}></Route>
                </Switch>
            </Router>
        )
    }
}

export default Main
