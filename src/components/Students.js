import React, { Component } from 'react'
import { Image, Modal, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import {fetchStudents, deleteStudentThunk, FILTER_STUDENTS } from '../store/students';
import { fetchCampuses } from '../store/campuses';
import { connect } from 'react-redux';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';
import FrontEndPagination from './FrontEndPagination';

const mapStateToProps = (state) => {
    // console.log("STUDENTS STATE", state)
    return {
        students: state.students,
        campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudents: () => dispatch(fetchStudents()),
        loadCampuses: () => dispatch(fetchCampuses()),
        localDeleteStudent: (student) => dispatch(deleteStudentThunk(student)),
        filterStudents: (filtered) => dispatch({type: FILTER_STUDENTS, filtered})
    }
}

class Students extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false,
            currentPage: 1,
            listingsPerPage: 10
        }

        this.deleteStudent = this.deleteStudent.bind(this)
        this.sortStudents = this.sortStudents.bind(this)
        this.filterStudents = this.filterStudents.bind(this)
        this.modalControl = this.modalControl.bind(this)
        this.paginate = this.paginate.bind(this)
        this.createPageNumbers = this.createPageNumbers.bind(this)
    }

    paginate(pageNumber) {
        this.setState({
            currentPage: pageNumber
        })
    }

    createPageNumbers() {
        const pages = []
        for (let i = 1; i <= Math.ceil(this.props.campuses.length / this.state.listingsPerPage); i++) {
            pages.push(i)
        }
        return pages
    }

     modalControl(val) {
        this.setState({
            modalIsOpen: val
        })
        // console.log(this.state.modalIsOpen)
    }

    deleteStudent(student) {
        // console.log(student.id)
        this.props.localDeleteStudent(student)
    }

    sortStudents(sortBy, direction) {
        const sorted = this.props.students.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return -1
                } else if (a[sortBy] > b[sortBy]) {
                    return 1
                } else {
                    return 0
                }
            })
            if (direction === 'ASC') {
                this.setState({
            students: sorted 
        })
            } else if (direction === 'DESC') {
                this.setState({
            students: sorted.reverse() 
        })
            }
        
    }

    filterStudents(enrolled) {
        let filtered = []
        if (enrolled === 'enrolled') {
            filtered = this.props.students.filter(student => student.campusId !== null)
        } else if (enrolled === 'notEnrolled') {
            filtered = this.props.students.filter(student => student.campusId === null)
        } else if (enrolled === 'clear') {
            this.props.loadStudents()
        }
        this.props.filterStudents(filtered)
    }

    componentDidMount() {
        this.props.loadStudents(),
        this.props.loadCampuses()
    }


    render() {
        const {students, campuses} = this.props || []
        // console.log("rendered")
        // console.log("campuses", campuses)
        const indexOfLastListing = this.state.currentPage * this.state.listingsPerPage;
        const indexOfFirstListing = indexOfLastListing - this.state.listingsPerPage;
        const currentListings = students.slice(indexOfFirstListing, indexOfLastListing)
        return (
            // <h1>Hello</h1>
            <Container>
                <h1>Students({students.length})</h1>
                <Button variant="outline-primary" onClick={() => this.modalControl(true)}>Add Student</Button>
                <Modal show={this.state.modalIsOpen} onHide={() => this.modalControl(false)}  size="lg"> 
                    <Modal.Header closeButton>
                    <h2>Add Student</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <AddStudentForm campuses={campuses} history={this.props.history} modalControl={this.state.modalIsOpen} defaultSchool={''}/>
                    </Modal.Body>
                </Modal>
                <div className="sort-and-filter">
                    <DropdownButton id="dropdown-basic-button" title="Sort By">
                                <Dropdown.Item onClick={() => this.sortStudents('lastName', 'ASC')}>Last Name (ASC)</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortStudents('lastName', 'DESC')}>Last Name (DESC)</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortStudents('gpa', 'ASC')}>GPA (ASC)</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.sortStudents('gpa', 'DESC')}>GPA (DESC)</Dropdown.Item>
                        </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" title="Filter By">
                                <Dropdown.Item onClick={() => this.filterStudents('enrolled')}>Enrolled in School</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.filterStudents('notEnrolled')}>Not Enrolled in School</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.filterStudents('clear')}>Clear Filters</Dropdown.Item>
                    </DropdownButton>
                </div>

                <FrontEndPagination paginate={this.paginate} pages={this.createPageNumbers()}/>
                <div className="trying-pagination campus-list">
                    {
                    currentListings.map((student) => {
                        return (
                            <div className="student-card" key={student.id}>
                                <Link to={`/students/single-student/${student.id}`}>
                                    <Image className="student-img" src={student.imageUrl} rounded/>
                                    <p>"{student.firstName}" {student.lastName}</p>
                                </Link>
                                <Button variant="btn btn-outline-danger" onClick={() => this.deleteStudent(student)}>Delete</Button>
                            </div>
                        )
                    })
                }
                </div>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);


