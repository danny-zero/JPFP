import React, { Component } from 'react';
import { Table, Modal, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Route, NavLink } from 'react-router-dom';
import { fetchSingleCampus, editCampusThunk } from '../store/singleCampus';
import CampusStudentList from './CampusStudentList'

const mapStateToProps = (state) => {
    console.log("STATE", state)
    return {
        singleCampus: state.singleCampusReducer.singleCampus,
        campusStudents: state.singleCampusReducer.campusStudents
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        loadingCampus: (id) => dispatch(fetchSingleCampus(id)),
        update: (id, name, address, description) => dispatch(editCampusThunk(id, name, address, description,  history))
    }
} 

class EditCampusForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:this.props.singleCampus.id ? this.props.singleCampus.name : '',
            address: this.props.singleCampus.id ? this.props.singleCampus.address : '',
            description: this.props.singleCampus.id ? this.props.singleCampus.description : []
        }
        console.log("PROF", this.props)
        //changeMethod
        this.handleChange = this.handleChange.bind(this)
        //submitMethod
        this.submitUpdateForm = this.submitUpdateForm.bind(this)
    }

    componentDidMount() {
        this.props.loadingCampus(this.props.match.params.campusId)
    }

     componentDidUpdate(prevProps) {
        if(!prevProps.singleCampus.id && this.props.singleCampus.id) {
            this.setState({
                name: this.props.singleCampus.name,
                address: this.props.singleCampus.address,
                description: this.props.singleCampus.description,
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitUpdateForm(event) {
        event.preventDefault();
        this.props.update(this.props.match.params.campusId, this.state.name, this.state.address, this.state.description)
    }

    render() {
        const {singleCampus, campusStudents} = this.props;
        return (
            <Container className=" single-campus mt-5">
            <Link to={`/campuses/single-campus/${this.props.singleCampus.id}`}><img src={singleCampus.imageUrl} /></Link>
                <Form onSubmit={this.submitUpdateForm}>
                    <Form.Label><strong>Name:</strong></Form.Label>
                    <Form.Control className="update-input" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    <Form.Label><strong>Address:</strong></Form.Label>
                    <Form.Control className="update-input" type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                    <Form.Label><strong>Description:</strong></Form.Label>
                    <Form.Control className="update-input-textarea" type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                    <Button variant="primary mt-5" type="submit">Submit</Button>
                    </Form>
                    <div>
                    <Row className="mt-5">
                    <NavLink to={`/edit/campus/${singleCampus.id}/students`} activeStyle={{fontWeight: "bold", color: "red"}}><h2>See the Students of {singleCampus.name}</h2></NavLink>
                    </Row>
                    <hr />
                    <Route exact path="/edit/campus/:campusId/students" render={() => <CampusStudentList campusStudents={campusStudents} />}></Route>
                </div>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampusForm);
