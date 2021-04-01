import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { createStudentThunk } from '../store/students';
import { fetchCampuses } from '../store/campuses';
import { fetchSingleCampus } from '../store/singleCampus';

const mapDispatchToProps = (dispatch) => {
    return {
        axiosPostUser: (firstName, lastName, email, school) => dispatch(createStudentThunk(firstName, lastName, email, school))
    }
}

class AddStudentForm extends Component {
    constructor() {
        super()
        this.state = {
            localFirstName: '',
            localLastName: '',
            localEmail: '',
            school: 'null'
        }

        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm(event) {
        // console.log(event.target.elements.school.value)
        event.preventDefault();

        this.props.axiosPostUser(this.state.localFirstName, this.state.localLastName, this.state.localEmail, this.state.school)

         if (this.props.modalControl) {
            this.props.modalControl(false)
        } else {
            // window.location.reload() //need to remove this
            this.props.history.push(`/campuses/single-campus/${this.props.defaultSchool.id}/students`)
        }

    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("prevProps", prevProps)
        // console.log("prevState", prevState)
        // console.log("props", this.props)
        if (prevState.school !== this.props.defaultSchool.id) {
            this.setState({school: this.props.defaultSchool.id})
        }
    }

    render() {
        const {campuses} = this.props || []
        // console.log("studentform", this.props)
        // console.log("TYPE", typeof this.props.defaultSchool)
        // if (typeof this.props.defaultScohol === 'string')
        const {defaultSchool} = this.props || {}
        // console.log("state", this.state)
        
        console.log(this.state)
        return (
            <div className="add-campus-form">
                <form onSubmit={this.onSubmitForm}>
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        value={this.state.localFirstName}
                        onChange={this.onChange}
                        name="localFirstName"
                        required
                        />
                    <label htmlFor="localLastName">Last Name: </label>
                    <input
                        type="text"
                        value={this.state.localLastName}
                        onChange={this.onChange}
                        name="localLastName"
                        required
                        />
                    <label htmlFor="localEmail">Email: </label>
                    <input
                        type="text"
                        value={this.state.localEmail}
                        onChange={this.onChange}
                        name="localEmail"
                        required
                        />
                    <label htmlFor="school">School: </label>
                    {
                        defaultSchool.id ? (
                            <select name="school"><option value={defaultSchool.id}>{defaultSchool.name}</option></select>
                        ) : (
                            <select name="school" onChange={this.onChange}>
                                <option value='null'>Select a School</option>
                                {
                                    campuses.map((campus) => {
                                        return <option key={campus.id} value={campus.id}>{campus.name}</option>
                                    })
                                }
                            </select>
                        )
                    }
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}



export default connect(null, mapDispatchToProps)(AddStudentForm)





