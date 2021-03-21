import React from 'react';
import { Link } from 'react-router-dom';

function CampusStudentList(props) {
    const {campusStudents} = props
    console.log("campusstudents", props)
    return (
        <div>
            {
                campusStudents.length === 0 ? (<h2>Slots Available! Enroll Now!</h2>) : (
                    <ul>
                        {
                            campusStudents.map(student => <Link to={`/students/${student.id}`} key={student.id}><li>{student.fullName}</li></Link>)
                            
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default CampusStudentList
