import React, { Component } from 'react'
import {fetchStudents, deleteStudentThunk} from '../store/students';
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
        loadStudents: () => dispatch(fetchStudents()),
        localDeleteStudent: (student) => dispatch(deleteStudentThunk(student))
    }
}

class Students extends Component {
    constructor() {
        super()

        this.deleteStudent = this.deleteStudent.bind(this)
    }

    deleteStudent(student) {
        console.log(student.id)
        this.props.localDeleteStudent(student)
    }


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
                                    <div className="student-card" key={student.id}>
                                        <Link to={`/students/${student.id}`}>
                                        <img src={student.imageUrl} />
                                        <p>"{student.firstName}" {student.lastName}</p>
                                        </Link>
                                        <button onClick={() => this.deleteStudent(student)}>Delete</button>
                                    </div>
                                    
                                )
                        }) 
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);


