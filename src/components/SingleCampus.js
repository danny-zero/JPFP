import React, { Component } from 'react';
import { Table, Modal, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Route, NavLink } from 'react-router-dom';
import { fetchSingleCampus, unregisterThunk } from '../store/singleCampus';
import { fetchCampuses } from '../store/campuses';
import CampusStudentList from './CampusStudentList';
import axios from 'axios';

const mapStateToProps = (state) => {
    // console.log("STATE", state)
    return {
        singleCampus: state.singleCampusReducer.singleCampus,
        campusStudents: state.singleCampusReducer.campusStudents,
        campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        loadingCampus: (id) => dispatch(fetchSingleCampus(id)),
        unregister: (campusId, id) => dispatch(unregisterThunk(campusId, id, history)),
        loadCampuses: () => dispatch(fetchCampuses())
    }
} 

class SingleCampus extends Component {
    constructor() {
        super()

        this.unregisterClick = this.unregisterClick.bind(this)
    }
    async componentWillMount() {
        const test = (await axios.get(`/api/campuses/${this.props.match.params.campusId}`)).data
        if (test.data === 'not found') {
            this.props.history.push('/notfound')
        }
        // console.log("willMount", this.props.match.params)
    }

    componentDidMount() {
        this.props.loadingCampus(this.props.match.params.campusId),
        this.props.loadCampuses()
    }

    unregisterClick(campusId, id) {
        this.props.unregister(campusId, id)
    }

    render() {
        // console.log("SINGLE CAMPUS", this.props)
        // console.log("got campuses?", this.props)
        const {campuses, singleCampus, campusStudents} = this.props;
        const description = this.props.singleCampus.description || []
        
        return (
            <Container className="single-campus">
                <Row>
                    <h1>{singleCampus.name}</h1> 
                </Row>
               <Row>
                    <Link to={`/edit/campus/${singleCampus.id}`}>Edit</Link>
               </Row>
               <Row>
                    <img src={singleCampus.imageUrl} />
               </Row>
               <Row>
                   <h3>{singleCampus.address}</h3>
               </Row>
               <Row>
                    {
                        description.map((line, index) => <p key={index}className="campus-description-paragraph">{line}</p>)
                    }
               </Row>
               <Row>
                    <NavLink to={`/campuses/single-campus/${singleCampus.id}/students`} activeStyle={{fontWeight: "bold", color: "red"}}><h2>See the Students of {singleCampus.name}</h2></NavLink>
               </Row>
               <hr />
               <Row>
                    <Route path="/campuses/single-campus/:campusId/students" render={() => <CampusStudentList defaultSchool={singleCampus} campuses={campuses} campusStudents={campusStudents} unregister={this.unregisterClick}/>}></Route>
               </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
