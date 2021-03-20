import React, { Component } from 'react'
import {fetchStudents} from '../store/students';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        students: state.students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudents: () => dispatch(fetchStudents())
    }
}

class Students extends Component {
    componentDidMount() {
    this.props.loadStudents()
  }
    render() {
        const {students} = this.props || []
        console.log(this.props)
        return (
            <div>
               {
                   students.map((student) => {
                       return (
                           <p key={student.id}>{student.lastName}, {student.firstName}</p>
                       )
                   }) 
               }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);


