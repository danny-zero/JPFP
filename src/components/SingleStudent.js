import React, { Component } from 'react';
import { Table, Modal, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleStudent } from '../store/singleStudent';
import axios from 'axios';

const mapStateToProps = (state) => {
    return {
        singleStudent: state.singleStudentReducer.singleStudent,
        studentCampus: state.singleStudentReducer.studentCampus,
        loading: state.singleStudentReducer.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingStudent: (id) => dispatch(fetchSingleStudent(id))
    }
}

class SingleStudent extends Component {
    async componentWillMount() {
        const test = (await axios.get(`/api/students/${this.props.match.params.studentId}`)).data
        if (test.data === 'not found') {
            this.props.history.push('/notfound')
        }
        // console.log("willMount", this.props.match.params)
    }

    componentDidMount() {
        this.props.loadingStudent(this.props.match.params.studentId)
        if (this.props.loading) {
            console.log("LOADING........")
        }
    }

    render() {
        const { singleStudent, studentCampus, loading } = this.props;
        // console.log("singleStudent", singleStudent)
        // console.log("singleCampus", studentCampus)
        // console.log("loadingprops?", this.props)
        if (loading) {
            return <h1>Loading...</h1>
        }
        return (
            <Container className="single-student-container">
                <Row>
                <img className="student-image" src={singleStudent.imageUrl}/>
                </Row>
                <Row>
                    <Link to={`/edit/student/${singleStudent.id}`}>Edit</Link>
                </Row>
                <Row>
                    <Col><h3>Name: </h3></Col>
                    <Col><h3>{singleStudent.fullName}</h3></Col>
                </Row>
                <Row>
                    <Col><h3>School: </h3></Col>
                    <Col>{studentCampus !== null ? <Link to={`/campuses/single-campus/${studentCampus.id}`}><h3>{studentCampus.name}</h3></Link> : <h3>Student not enrolled in school</h3>}</Col>
                </Row>
                <Row>
                    <Col><h3>Email: </h3></Col>
                    <Col><h3>{singleStudent.email}</h3></Col>
                </Row>
                <Row>
                    <Col><h3>GPA: </h3></Col>
                    <Col><h3 className={singleStudent.gpa > 2.3 ? 'gpa green-gpa' 
                                            : singleStudent.gpa < 2.3 && singleStudent.gpa >= 1.7 ? 'gpa orange-gpa' 
                                            : singleStudent.gpa < 1.7 ? 'gpa red-gpa' 
                                            : '' }>{singleStudent.gpa}</h3></Col>
                </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
