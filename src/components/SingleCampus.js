import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCampus } from '../store/singleCampus';

const mapStateToProps = (state) => {
    return {
        singleCampus: state.singleCampus
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
        return (
            <div>
               <h1>Single Campus</h1> 
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
