import React, { Component } from 'react';
import { fetchCampuses, deleteThunk } from '../store/campuses';
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
        loadCampuses: () => dispatch(fetchCampuses()),
        localDeleteCampus: (campus) => dispatch(deleteThunk(campus))
    }
}

class Campuses extends Component {
    constructor() {
        super()

        this.deleteCampus = this.deleteCampus.bind(this)
    }

    deleteCampus(campus) {
        console.log(campus.id)
        this.props.localDeleteCampus(campus)
    }

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
                <h1>Campuses({campuses.length})</h1>
                <div className="campus-list">
                    {
                    campuses.map((campus) => {
                        return (
                            <div className="campus-card" key={campus.id}>
                                <Link className="campus-card-link" to={`/campuses/${campus.id}`}>
                                    <img src={campus.imageUrl} />
                                    <p>{campus.name}</p>
                                </Link>
                                <button onClick={() => this.deleteCampus(campus)}>Delete</button>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
