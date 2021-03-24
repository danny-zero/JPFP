import React, { Component } from 'react'
import {fetchStudents} from '../store/students';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';

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
                <AddStudentForm history={history}/>
                <div className="student-list">
                    {
                        students.map((student) => {
                            return (
                                    <Link to={`/students/${student.id}`} key={student.id}>
                                    <div className="student-card">
                                        <img src={student.imageUrl} />
                                        <p>"{student.firstName}" {student.lastName}</p>
                                    </div>
                                    </Link>
                                )
                        }) 
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);


