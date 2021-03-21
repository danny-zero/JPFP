import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { fetchSingleCampus } from '../store/singleCampus';
import CampusStudentList from './CampusStudentList'

const mapStateToProps = (state) => {
    console.log("STATE", state)
    return {
        singleCampus: state.singleCampusReducer.singleCampus,
        campusStudents: state.singleCampusReducer.campusStudents
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingCampus: (id) => dispatch(fetchSingleCampus(id))
    }
} 

class SingleCampus extends Component {
    componentDidMount() {
        this.props.loadingCampus(this.props.match.params.campusId)
    }

    render() {
        console.log("SINGLE CAMPUS", this.props)
        const {singleCampus, campusStudents} = this.props;
        const description = this.props.singleCampus.description || []
        
        return (
            <div className="single-campus">
               <h1>{singleCampus.name}</h1> 
               <img src={singleCampus.imageUrl} />
               <h3>{singleCampus.address}</h3>
               {
                   description.map((line, index) => <p key={index}className="campus-description-paragraph">{line}</p>)
               }
               <NavLink to={`/campuses/${singleCampus.id}/students`} activeStyle={{fontWeight: "bold", color: "red"}}><h2>See the Students of {singleCampus.name}</h2></NavLink>
               <hr />
               <Route path="/campuses/:campusId/students" render={() => <CampusStudentList campusStudents={campusStudents} />}></Route>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
