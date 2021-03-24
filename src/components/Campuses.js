import React, { Component } from 'react';
import { fetchCampuses } from '../store/campuses';
import { connect } from 'react-redux';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import AddCampusForm from './AddCampusForm';

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCampuses: () => dispatch(fetchCampuses())
    }
}

class Campuses extends Component {
    componentDidMount() {
        this.props.loadCampuses()
    }

    render() {
        console.log("ALL CAMPUSES", this.props)
        const {campuses, history} = this.props
        // console.log("HOW MANY CAMPUSES?", campuses.length)
        return (
            <div>
                <AddCampusForm history={history}/>
                <h1>Campuses</h1>
                <div className="campus-list">
                    {
                    campuses.map((campus) => {
                        return (
                            <Link to={`/campuses/${campus.id}`} key={campus.id}>
                            <div className="campus-card">
                                <img src={campus.imageUrl} />
                                <p>{campus.name}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
