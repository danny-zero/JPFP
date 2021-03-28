import React, { Component } from 'react';
import { Modal, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { fetchCampuses, deleteThunk, FILTER_CAMPUSES } from '../store/campuses';
import { connect } from 'react-redux';
import { Link, NavLink, HashRouter as Router, Route } from 'react-router-dom';
import AddCampusForm from './AddCampusForm';



const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCampuses: () => dispatch(fetchCampuses()),
        localDeleteCampus: (campus) => dispatch(deleteThunk(campus)),
        filterCampuses: (filtered) => dispatch({type: FILTER_CAMPUSES, filtered})
    }
}

class Campuses extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false
        }

        this.deleteCampus = this.deleteCampus.bind(this)
        this.sortCampuses = this.sortCampuses.bind(this)
        this.filterCampuses = this.filterCampuses.bind(this)
        this.modalControl = this.modalControl.bind(this)
    }

    modalControl(val) {
        this.setState({
            modalIsOpen: val
        })
        // console.log(this.state.modalIsOpen)
    }

    deleteCampus(campus) {
        // console.log(campus.id)
        this.props.localDeleteCampus(campus)
    }

    sortCampuses(sortBy, direction) {
        let sorted = []
        if (sortBy === 'students') {
              sorted = this.props.campuses.sort((a, b) => {
                if (a[sortBy].length < b[sortBy].length) {
                    return -1
                } else if (a[sortBy].length > b[sortBy].length) {
                    return 1
                } else {
                    return 0
                }
            })
        } else {
            sorted = this.props.campuses.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return -1
                } else if (a[sortBy] > b[sortBy]) {
                    return 1
                } else {
                    return 0
                }
            })
        }
        // console.log(sorted)
            if (direction === 'ASC') {
                this.setState({
            campuses: sorted 
        })
            } else if (direction === 'DESC') {
                this.setState({
            campuses: sorted.reverse() 
        })
            }
        
    }

    filterCampuses(students) {
        let filtered = this.props.campuses
        if (students === 'hasStudents') {
            filtered = this.props.campuses.filter(campus => campus.students.length > 0)
        } else if (students === 'noStudents'){
            filtered = this.props.campuses.filter(campus => campus.students.length === 0)
        } else if(students === 'clear') {
            this.props.loadCampuses()
        }
        this.props.filterCampuses(filtered)
    }

    componentDidMount() {
        this.props.loadCampuses()
    }

    render() {
        // console.log("ALL CAMPUSES", this.props)
        const {campuses, history} = this.props
        // console.log("HELLOOOOO", campuses)
        // console.log(campuses)
        // console.log("PROPS", this.props)
        // console.log(this.state)
        return (
            <Container>
                <h1>Campuses({campuses.length})</h1>
                <Button variant="outline-primary" onClick={() => this.modalControl(true)}>Add Campus</Button>
                <Modal show={this.state.modalIsOpen} onHide={() => this.modalControl(false)}  size="lg"> 
                    <Modal.Header closeButton>
                    <h2>Add Campus</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <AddCampusForm history={history} />
                    </Modal.Body>
                </Modal>
                <div className="sort-and-filter">
                    <DropdownButton id="dropdown-basic-button" title="Sort By">
                        <Dropdown.Item onClick={() => this.sortCampuses('name', 'ASC')}>Campus Name (ASC)</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.sortCampuses('name', 'DESC')}>Campus Name (DESC)</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.sortCampuses('students', 'ASC')}>Amount of Students (ASC)</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.sortCampuses('students', 'DESC')}>Amount of Students (DESC)</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title="Filter By">
                            <Dropdown.Item onClick={() => this.filterCampuses('hasStudents')}>Has Students</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.filterCampuses('noStudents')}>No Students</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.filterCampuses('clear')}>Clear Filters</Dropdown.Item>
                    </DropdownButton>
                </div>
                
                <div className="campus-list">
                    {
                    campuses.map((campus, index) => {
                        return (
                            <div className="campus-card" key={campus.id}>
                                <Link className="campus-card-link" to={`/campuses/single-campus/${campus.id}`}>
                                    <img src={campus.imageUrl}/>
                                    <p>{campus.name}</p>
                                </Link>
                                <Button variant="btn btn-outline-danger" onClick={() => this.deleteCampus(campus)}>Delete</Button>
                            </div>
                        )
                    })
                }
                </div>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
