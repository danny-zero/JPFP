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
            school: ''
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
        event.preventDefault();
        let keepGoing = true
        for (let i = 0; i < event.target.elements.length - 1; i++) {
            if (event.target.elements[i].value === '') {
                const label = event.target.elements[i].name.replace('local', '').split(/(?=[A-Z])/).join(' ')
                keepGoing = false
                alert(`${label} cannot be blank`)
            }
        }

        if (keepGoing) {
            this.props.axiosPostUser(this.state.localFirstName, this.state.localLastName, this.state.localEmail)
        }

        // this.props.history.push('/students')
        // this.props.history.push('/temp')
        // this.props.history.goBack();
        window.location.reload();
        
    }

    render() {
        const {campuses} = this.props || []
        // console.log("studentform", this.props)
        // console.log("TYPE", typeof this.props.defaultSchool)
        // if (typeof this.props.defaultScohol === 'string')
        return (
            <div className="add-campus-form">
                <form onSubmit={this.onSubmitForm}>
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        value={this.state.localFirstName}
                        onChange={this.onChange}
                        name="localFirstName"
                        />
                    <label htmlFor="localLastName">Last Name: </label>
                    <input
                        type="text"
                        value={this.state.localLastName}
                        onChange={this.onChange}
                        name="localLastName"
                        />
                    <label htmlFor="localEmail">Email: </label>
                    <input
                        type="text"
                        value={this.state.localEmail}
                        onChange={this.onChange}
                        name="localEmail"
                        />
                    <label htmlFor="school">School: </label>
                    {/* <select name="school" onChange={this.onChange}>
                        <option value='null'>Select a School</option>
                        {
                            campuses.map((campus) => {
                                return <option key={campus.id} value={campus.id}>{campus.name}</option>
                            })
                        }
                    </select> */}
                    {
                        typeof this.props.defaultSchool === 'object' ? (
                            <select name="school" onChange={this.onChange}><option value={this.props.defaultSchool.id}>{this.props.defaultSchool.name}</option></select>
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





