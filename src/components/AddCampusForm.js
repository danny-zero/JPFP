import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postCampus } from '../store/campuses';

const mapDispatchToProps = (dispatch) => {
    return {
        axiosPostUser: (campusName, campusAddress) => dispatch(postCampus(campusName, campusAddress))
    }
}

class AddCampusForm extends Component {
    constructor() {
        super()
        this.state = {
            campusName: '',
            campusAddress: ''
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
        this.props.axiosPostUser(this.state.campusName, this.state.campusAddress)
    }

    render() {
        return (
            <div className="add-campus-form">
                <form onSubmit={this.onSubmitForm}>
                    <label htmlFor="campusName">Campus Name: </label>
                    <input
                        type="text"
                        value={this.state.campusName}
                        onChange={this.onChange}
                        name="campusName"
                        />
                    <label htmlFor="campusAddress">Campus Address: </label>
                    <input
                        type="text"
                        value={this.state.campusAddress}
                        onChange={this.onChange}
                        name="campusAddress"
                        />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}



export default connect(null, mapDispatchToProps)(AddCampusForm)

