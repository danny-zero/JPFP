import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStudentThunk } from '../store/students';

const mapDispatchToProps = (dispatch) => {
    return {
        axiosPostUser: (firstName, lastName, email) => dispatch(createStudentThunk(firstName, lastName, email))
    }
}

class AddStudentForm extends Component {
    constructor() {
        super()
        this.state = {
            localFirstName: '',
            localLastName: '',
            localEmail: ''
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
        this.props.axiosPostUser(this.state.localFirstName, this.state.localLastName, this.state.localEmail)
    }

    render() {
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
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}



export default connect(null, mapDispatchToProps)(AddStudentForm)

