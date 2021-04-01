import React from 'react';
import { Accordion, ListGroup, Table, Modal, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';

function CampusStudentList(props) {
    const {campusStudents, campuses, history} = props;
    const campusId = props.campusIdProp
    console.log("campusstudentsList", props)
    return (
        <Container>
            {
                campusStudents.length === 0 ? (
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Slots Available! Enroll Now!
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body><AddStudentForm campuses={campuses} defaultSchool={props.defaultSchool} history={history}/></Card.Body>
                            </Accordion.Collapse>
                            
                        </Card>
                    </Accordion>

                ) : (
                    <ListGroup>
                        {
                            campusStudents.map(student => <div key={student.id} className="campus-student-list"><ListGroup.Item><Link to={`/students/single-student/${student.id}`}>{student.fullName}</Link><Button variant="outline-danger" onClick={() => props.unregister(campusId, student.id)}>Unregister</Button></ListGroup.Item></div>)
                            
                        }
                    </ListGroup>
                )
            }
        </Container>
    )
}

export default CampusStudentList
