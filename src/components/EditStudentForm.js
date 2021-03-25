import React, { Component } from 'react';
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
            school: this.props.studentCampus.id ? this.props.studentCampus.id : '',
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
        return (
            <div className="single-student">
                <Link to={`/students/${this.props.singleStudent.id}`}><img className="student-image" src={this.props.singleStudent.imageUrl}/></Link>
                <form onSubmit={this.submitUpdateForm}>
                    <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="firstName"><h3>First Name: </h3></label></td>
                        <td><input className="update-input" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="lastName"><h3>Last Name: </h3></label></td>
                        <td><input className="update-input" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="school"><h3>School: </h3></label></td>
                        <td>{this.props.studentCampus !== null ? (
                            <select name="school" onChange={this.handleChange}>
                                <option value={this.props.studentCampus.id}>{this.props.studentCampus.name}</option>
                                {
                                    campuses.map((campus) => {
                                        return <option key={campus.id} value={campus.id}>{campus.name}</option>
                                    })
                                }
                                <option value=''>Not in School</option>
                            </select>
                        ) : (
                            <select name="school">
                                <option value=''>Not in School</option>
                                {
                                    campuses.map((campus) => {
                                        return <option key={campus.id} value={campus.name}>{campus.name}</option>
                                    })
                                }
                            </select>
                        )}</td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email"><h3>Email: </h3></label></td>
                        <td><input className="update-input" type="text" name="email" value={this.state.email} onChange={this.handleChange}/></td>
                    </tr>
                </tbody>
            </table>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentForm);
