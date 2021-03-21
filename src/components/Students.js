import React, { Component } from 'react'
import {fetchStudents} from '../store/students';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        // console.log(this.props)
        return (
            <div>
               {
                   students.map((student) => {
                       return (
                           <Link to={`/students/${student.id}`} key={student.id}><p>{student.lastName}, {student.firstName}</p></Link>
                       )
                   }) 
               }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);


