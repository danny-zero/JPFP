import React, { Component } from 'react';
import { Table, Modal, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editStudentThunk, fetchSingleStudent } from '../store/singleStudent';
import { fetchCampuses } from '../store/campuses';

const mapStateToProps = (state) => {
    return {
        singleStudent: state.singleStudentReducer.singleStudent,
        studentCampus: state.singleStudentReducer.studentCampus,
        campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        loadCampuses: () => dispatch(fetchCampuses()),
        loadingStudent: (id) => dispatch(fetchSingleStudent(id)),
        update: (id, firstName, lastName, school, email) => dispatch(editStudentThunk(id, firstName, lastName, school, email,  history))
    }
}

class EditStudentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: this.props.singleStudent.id ? this.props.singleStudent.firstName : '',
            lastName: this.props.singleStudent.id ? this.props.singleStudent.lastName : '',
            school: this.props.studentCampusId ? this.props.studentCampus.id : '',
            email: this.props.singleStudent.id ? this.props.singleStudent.email : ''
        }
        console.log(this.props)
        //changeMethod
        this.handleChange = this.handleChange.bind(this)
        //submitMethod
        this.submitUpdateForm = this.submitUpdateForm.bind(this)
    }
    componentDidMount() {
        this.props.loadingStudent(this.props.match.params.studentId),
        this.props.loadCampuses()
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.singleStudent.id && this.props.singleStudent.id) {
            this.setState({
                firstName: this.props.singleStudent.firstName,
                lastName: this.props.singleStudent.lastName,
                email: this.props.singleStudent.email,
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
        this.props.update(this.props.match.params.studentId, this.state.firstName, this.state.lastName, this.state.school, this.state.email)
    }

    render() {
        const { campuses } = this.props
        console.log("hello", campuses)
        console.log("singlePRops", this.props)
        return (
            <Container className="mt-5" >
            <Link to={`/students/single-student/${this.props.singleStudent.id}`}><img className="student-image" src={this.props.singleStudent.imageUrl}/></Link>
            <Form onSubmit={this.submitUpdateForm}>
                    <Form.Label><strong>First Name: </strong></Form.Label>
                    <Form.Control className="update-input" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                    <Form.Label><strong>Last Name: </strong></Form.Label>
                    <Form.Control className="update-input" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                    <Form.Label><strong>School: </strong></Form.Label>
                    {this.props.studentCampus !== null ? (
                            <Form.Control as="select" name="school" onChange={this.handleChange}>
                                <option value={this.props.studentCampus.id}>{this.props.studentCampus.name}</option>
                                {
                                    campuses.map((campus) => {
                                        return <option key={campus.id} value={campus.id}>{campus.name}</option>
                                    })
                                }
                                <option value=''>Not in School</option>
                            </Form.Control>
                        ) : (
                            <Form.Control as="select" name="school" onChange={this.handleChange}>
                                <option value=''>Not in School</option>
                                {
                                    campuses.map((campus) => {
                                        return <option key={campus.id} value={campus.name}>{campus.name}</option>
                                    })
                                }
                            </Form.Control>
                        )}
                        <Form.Label><strong>Email: </strong></Form.Label>
                        <Form.Control className="update-input" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                        <Button variant="primary mt-5" type="submit">Submit</Button>        
            </Form>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentForm);
