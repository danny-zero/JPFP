import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, NavLink } from 'react-router-dom';
import { fetchSingleCampus, unregisterThunk } from '../store/singleCampus';
import CampusStudentList from './CampusStudentList'

const mapStateToProps = (state) => {
    console.log("STATE", state)
    return {
        singleCampus: state.singleCampusReducer.singleCampus,
        campusStudents: state.singleCampusReducer.campusStudents
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        loadingCampus: (id) => dispatch(fetchSingleCampus(id)),
        unregister: (campusId, id) => dispatch(unregisterThunk(campusId, id, history))
    }
} 

class SingleCampus extends Component {
    constructor() {
        super()

        this.unregisterClick = this.unregisterClick.bind(this)
    }
    componentDidMount() {
        this.props.loadingCampus(this.props.match.params.campusId)
    }

    unregisterClick(campusId, id) {
        this.props.unregister(campusId, id)
    }

    render() {
        console.log("SINGLE CAMPUS", this.props)
        const {singleCampus, campusStudents} = this.props;
        const description = this.props.singleCampus.description || []
        
        return (
            <div className="single-campus">
               <h1>{singleCampus.name}</h1> 
               <Link to={`/edit/campus/${singleCampus.id}`}>Edit</Link>
               <img src={singleCampus.imageUrl} />
               <h3>{singleCampus.address}</h3>
               {
                   description.map((line, index) => <p key={index}className="campus-description-paragraph">{line}</p>)
               }
               <NavLink to={`/campuses/single-campus/${singleCampus.id}/students`} activeStyle={{fontWeight: "bold", color: "red"}}><h2>See the Students of {singleCampus.name}</h2></NavLink>
               <hr />
               <Route path="/campuses/single-campus/:campusId/students" render={() => <CampusStudentList campusStudents={campusStudents} campusIdProp={singleCampus.id} unregister={this.unregisterClick}/>}></Route>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
