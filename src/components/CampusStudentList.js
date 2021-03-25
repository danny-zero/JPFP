import React from 'react';
import { Link } from 'react-router-dom';

function CampusStudentList(props) {
    const {campusStudents} = props;
    const campusId = props.campusIdProp
    console.log("campusstudents", props)
    return (
        <div>
            {
                campusStudents.length === 0 ? (<h2>Slots Available! Enroll Now!</h2>) : (
                    <ul>
                        {
                            campusStudents.map(student => <div key={student.id} className="campus-student-list"><Link to={`/students/${student.id}`} ><li>{student.fullName}</li></Link><button onClick={() => props.unregister(campusId, student.id)}>Unregister</button></div>)
                            
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default CampusStudentList
