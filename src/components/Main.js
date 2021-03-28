import React, { Component } from 'react'
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import NotFound from './NotFound';

class Main extends Component {
    render() {
        return (
            <Router>
                <Nav />
                <Switch>
                    <Route path="/campuses/single-campus/:campusId" component={SingleCampus} />
                    <Route path="/students/single-student/:studentId" component={SingleStudent} />
                    <Route path="/add-campus-form" component={AddCampusForm}></Route>
                    <Route path="/add-student-form" component={AddStudentForm}></Route>
                    <Route path="/edit/campus/:campusId" component={EditCampusForm}></Route>
                    <Route path="/edit/student/:studentId" component={EditStudentForm}></Route>
                    <Route path="/students" component={Students}/>
                    <Route path="/campuses" component={Campuses}/>
                    <Route exact path="/" component={Home}/>
                    <Route component={NotFound}></Route>
                </Switch>
            </Router>
        )
    }
}

export default Main
