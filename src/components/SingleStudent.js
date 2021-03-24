import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleStudent } from '../store/singleStudent';

const mapStateToProps = (state) => {
    return {
        singleStudent: state.singleStudentReducer.singleStudent,
        studentCampus: state.singleStudentReducer.studentCampus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingStudent: (id) => dispatch(fetchSingleStudent(id))
    }
}

class SingleStudent extends Component {
    componentDidMount() {
        this.props.loadingStudent(this.props.match.params.studentId)
    }

    render() {
        const { singleStudent, studentCampus } = this.props;
        console.log("singleStudent", singleStudent)
        console.log("singleCampus", studentCampus)
        return (
            <div className="single-student">
                <img className="student-image" src={singleStudent.imageUrl}/>
            <table>
                <tbody>
                    <tr>
                        <td><h3>Name:</h3></td>
                        <td><h3>{singleStudent.fullName}</h3></td>
                    </tr>
                    <tr>
                        <td><h3>School:</h3></td>
                        <td>{studentCampus !== null ? <Link to={`/campuses/${studentCampus.id}`}><h3>{studentCampus.name}</h3></Link> : <h3>Student not enrolled in school</h3>}</td>
                    </tr>
                    <tr>
                        <td><h3>Email:</h3></td>
                        <td><h3>{singleStudent.email}</h3></td>
                    </tr>
                    <tr>
                        <td><h3>GPA:</h3></td>
                        <td><h3 className={singleStudent.gpa > 2.3 ? 'green-gpa' 
                                            : singleStudent.gpa < 2.3 && singleStudent.gpa >= 1.7 ? 'orange-gpa' 
                                            : singleStudent.gpa < 1.7 ? 'red-gpa' 
                                            : '' }>{singleStudent.gpa}</h3>
                        </td>
                        <td><h3>{singleStudent.gender === 'female' ? 'goodgurl' : 'goodboi'}</h3></td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
